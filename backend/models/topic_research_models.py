from pydantic import BaseModel, Field
from typing import List

class WebSource(BaseModel):
    url: str = Field(description="The URL of the web page that was scraped.")
    title: str = Field(description="The title of the web page that was scraped.")

# class WebScrapingTaskSingleResult(BaseModel):
#     source: WebSource = Field(description="The source of the web page that was scraped.")
#     content: str = Field(description="The content of the web page that was scraped.")

# class WebScrapingTaskResult(BaseModel):
#     results: List[WebScrapingTaskSingleResult] = Field(description="A list of results from the web scraping task.")

# class ResearchTaskResult(BaseModel):
#     content: str = Field(description="The content of the research that was conducted.")
#     sources: List[WebSource] = Field(description="A list of sources that were used to conduct the research.")

class BlogTaskResult(BaseModel):
    title: str = Field(description="The title of the blog post that was created.")
    content: str = Field(description="The content of the long blog post that was created. A well-structured, engaging blog post that effectively communicates the research findings with proper citations in markdown format without '```")
    sources: List[WebSource] = Field(description="A list of sources that were used to create the blog post.")
