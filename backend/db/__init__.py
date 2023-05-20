from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')

client = MongoClient(
    f'mongodb://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/?authMechanism=DEFAULT')

db = client.home_automation


class Collection:
    def __init__(self, collection: str) -> None:
        self.collection = db[collection]

    def add(self, doc: dict) -> str:
        document = self.collection.insert_one(doc)
        id = document.inserted_id.__str__()
        return id

    def find_one(self, filter):
        document = self.collection.find_one(filter=filter)
        return document
