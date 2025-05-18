from crewai import Agent, Crew, Task, Process
from mcp import StdioServerParameters
from crewai_tools import MCPServerAdapter
import os
import logging
from datetime import datetime
import time
from models.topic_research_models import WebScrapingPlannerTaskResult, WebScrapingLinkCollectorTaskResult, WebLink
from typing import List
from config import llm, TOPIC_RESEARCH_AGENT_CONFIGS, TOPIC_RESEARCH_TASK_CONFIGS

server_params = StdioServerParameters(
    command="pnpm",
    args=["dlx", "@brightdata/mcp"],
    env={"API_TOKEN": os.environ["BRIGHT_DATA_API_TOKEN"], "BROWSER_AUTH": os.environ["BRIGHT_DATA_BROWSER_AUTH"]},
)

# Initialize MCPAdapt with CrewAI adapter
async def run_research_crew(topic: str):
    start_time = time.time()
    with MCPServerAdapter(server_params) as tools:
        current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        logging.info(f"Tools: {tools}")

        web_scraping_link_collector_tools = [
            "search_engine",
        ]

        web_scraping_tools = [
            "scrape_as_markdown",
        ]

        # Planning crew agents
        web_scraping_planner = Agent(
            role=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraping_planner"]["role"],
            goal=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraping_planner"]["goal"],
            backstory=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraping_planner"]["backstory"],
            verbose=True,
            llm=llm,
        )

        # Planning crew tasks

        planner_task = Task(
            description=TOPIC_RESEARCH_TASK_CONFIGS["planner"]["description"],
            expected_output=TOPIC_RESEARCH_TASK_CONFIGS["planner"]["expected_output"],
            agent=web_scraping_planner,
            max_retries=5,
            output_pydantic=WebScrapingPlannerTaskResult
        )

        # Planning crew
        planning_crew = Crew(
            agents=[web_scraping_planner],
            tasks=[planner_task],
            verbose=True,
            process=Process.sequential,
            output_log_file=f"logs/planning_crew_{current_time}.log",
            max_rpm=20
        )

        # Web scraping link collector agents
        web_scraping_link_collector = Agent(
            role=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraping_link_collector"]["role"],
            goal=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraping_link_collector"]["goal"],
            backstory=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraping_link_collector"]["backstory"],
            verbose=True,
            tools=[tool for tool in tools if tool.name in web_scraping_link_collector_tools],
            llm=llm,
        )

        # Web scraping link collector tasks
        link_collector_task = Task(
            description=TOPIC_RESEARCH_TASK_CONFIGS["link_collector"]["description"],
            expected_output=TOPIC_RESEARCH_TASK_CONFIGS["link_collector"]["expected_output"],
            agent=web_scraping_link_collector,
            max_retries=5,
            output_pydantic=WebScrapingLinkCollectorTaskResult
        )

        # Web scraping link collector crew
        web_scraping_link_collector_crew = Crew(
            agents=[web_scraping_link_collector],
            tasks=[link_collector_task],
            verbose=True,
            process=Process.sequential,
            output_log_file=f"logs/web_scraping_link_collector_crew_{current_time}.log",
            max_rpm=20
        )

        # Web scraping agents
        web_scraper = Agent(
            role=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraper"]["role"],
            goal=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraper"]["goal"],
            backstory=TOPIC_RESEARCH_AGENT_CONFIGS["web_scraper"]["backstory"],
            verbose=True,
            tools=[tool for tool in tools if tool.name in web_scraping_tools],
            llm=llm,
            max_iter=50,
        )

        # Web scraping tasks
        web_scraping_task = Task(
            description=TOPIC_RESEARCH_TASK_CONFIGS["web_scraping"]["description"],
            expected_output=TOPIC_RESEARCH_TASK_CONFIGS["web_scraping"]["expected_output"],
            agent=web_scraper,
            max_retries=5
        )

        # Web scraping crew
        web_scraping_crew = Crew(
            agents=[web_scraper],
            tasks=[web_scraping_task],
            verbose=True,
            process=Process.sequential,
            output_log_file=f"logs/web_scraping_crew_{current_time}.log",
            max_rpm=20
        )

        # Research and content creation agents
        researcher = Agent(
            role=TOPIC_RESEARCH_AGENT_CONFIGS["researcher"]["role"],
            goal=TOPIC_RESEARCH_AGENT_CONFIGS["researcher"]["goal"],
            backstory=TOPIC_RESEARCH_AGENT_CONFIGS["researcher"]["backstory"],
            verbose=True,
            llm=llm,
        )

        content_writer = Agent(
            role=TOPIC_RESEARCH_AGENT_CONFIGS["content_writer"]["role"],
            goal=TOPIC_RESEARCH_AGENT_CONFIGS["content_writer"]["goal"],
            backstory=TOPIC_RESEARCH_AGENT_CONFIGS["content_writer"]["backstory"],
            verbose=True,
            llm=llm,
        )

        # Research and content creation tasks
        research_task = Task(
            description=TOPIC_RESEARCH_TASK_CONFIGS["research_analysis"]["description"],
            expected_output=TOPIC_RESEARCH_TASK_CONFIGS["research_analysis"]["expected_output"],
            agent=researcher,
            max_retries=5,
        )

        content_task = Task(
            description=TOPIC_RESEARCH_TASK_CONFIGS["content_creation"]["description"],
            expected_output=TOPIC_RESEARCH_TASK_CONFIGS["content_creation"]["expected_output"],
            agent=content_writer,
            context=[research_task],
            max_retries=5,
        )

        # Research and content creation crew
        research_content_crew = Crew(
            agents=[researcher, content_writer],
            tasks=[research_task, content_task],
            verbose=True,
            process=Process.sequential,
            output_log_file=f"logs/research_content_crew_{current_time}.log",
            max_rpm=20
        )

        planning_crew_result = await planning_crew.kickoff_async(inputs={
            "topic": topic,
            "current_time": current_time
        })

        logging.info(f"Planning crew result: {planning_crew_result}")

        search_queries = planning_crew_result["search_queries"]

        logging.info(f"Search queries: {search_queries}")

        scraped_data = []
        links: List[WebLink] = []

        logging.info(f"Running web scraping link collector crew for {len(search_queries)} search queries")

        for search_query in search_queries:

            logging.info(f"Running web scraping link collector crew for search query {search_query}")

            web_scraping_link_collector_crew_result = await web_scraping_link_collector_crew.kickoff_async(inputs={
                "topic": topic,
                "search_query": search_query,
                "current_time": current_time,
            })

            logging.info(f"Web scraping link collector crew result for search query {search_query}: {web_scraping_link_collector_crew_result}")

            links = web_scraping_link_collector_crew_result["links"]

            for link in links:
                if link.url not in [l.url for l in links]:
                    links.append(link)

        logging.info(f"Unique Links Collected: {links}")

        logging.info(f"Running web scraping crew for {len(links)} links")

        for link in links:
            web_scraping_crew_result = await web_scraping_crew.kickoff_async(inputs={
                "topic": topic,
                "url": link.url,
                "current_time": current_time,
            })

            logging.info(f"Web scraping crew result for link {link}: {web_scraping_crew_result}")

            scraped_data.append({
                "url": link.url,
                "page_title": link.title,
                "content": web_scraping_crew_result.raw
            })

        logging.info(f"Scraped data: {scraped_data}")

        research_content_crew_result = await research_content_crew.kickoff_async(inputs={
            "topic": topic,
            "scraped_data": scraped_data,
            "current_time": current_time,
        })

        logging.info(f"Research and content creation crew result: {research_content_crew_result}")

        logging.info(f"Time taken: {round(time.time() - start_time, 2)} seconds")

        return {
            "blog_post": research_content_crew_result.raw,
            "links": [link.model_dump() for link in links]
        }