"""
Task configurations for the research crew.
Each task is defined with its description and expected output.
"""

TASK_CONFIGS = {
    "web_scraping": {
        "description": """Scrape and extract comprehensive raw data about Topic {topic} from 10-20 different websites.

        Use these tools to gather information:
        - search_engine: Find relevant websites about the topic
        - scrape_as_markdown: Extract content in markdown format
        - scraping_browser_navigate: Visit websites
        - scraping_browser_get_html: Extract html content
        - scraping_browser_go_back/forward: Navigate between pages
        - scraping_browser_click: Click on elements
        - scraping_browser_links: Get all links on page
        - scraping_browser_type: Enter text in forms
        - scraping_browser_get_text: Extract text content

        Instructions:
        1. Search for 10-20 high-quality websites about {topic}. Exclude websites/links which are audio, video, or images such as youtube, soundcloud, etc.
        2. For each website:
           - Navigate to the main content
           - Extract all relevant text, data and information
           - Capture any useful statistics, facts or figures
           - Store raw content in markdown format
           - Navigate to related pages if available
        3. Continue until you have raw data from at least 10 different websites
        4. Return all extracted content without processing or analysis

        Today's date and time is {current_time}""",
        "expected_output": "Raw, unprocessed data and content extracted from 10-20 different websites about the topic, stored in markdown format. Keep Source URLs + Title of the website in the output associated with each extracted content."
    },
    "research_analysis": {
        "description": """Analyze and synthesize the scraped information to identify key insights and patterns.

        Today's date and time is {current_time}""",
        "expected_output": "A detailed research analysis with key findings, patterns, and insights with proper citations. Keep Source URLs + Title of the website in the output associated with each extracted content."
    },
    "content_creation": {
        "description": """Create an engaging and informative blog post based on the research analysis.

        Today's date and time is {current_time}""",
        "expected_output": "A well-structured, engaging blog post that effectively communicates the research findings with proper citations in markdown format without '```'. Keep Source URLs + Title of the website in the output associated with each extracted content."
    }
}