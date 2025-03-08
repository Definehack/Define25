from pinecone import Pinecone
from dotenv import load_dotenv
import os

load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

pc = Pinecone(
    name = "FlowFi",
    api_key = PINECONE_API_KEY,
    model_name = "flowfi",
    model_type = "annoy",
    dimension = 768,
    metric = "euclidean",
    shards = 1,
    index_file_size = 1024,
    distance_threshold = 0.1
)