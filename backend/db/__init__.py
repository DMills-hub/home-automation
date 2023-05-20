from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson import ObjectId

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
        serialisedDoc = self.serialise_document(document=document)
        return serialisedDoc

    def delete(self, id: str) -> int:
        delete = self.collection.delete_one({"_id": ObjectId(id)})
        return delete.deleted_count
    
    def find_by_id(self,id: str):
        foundDoc = self.collection.find_one(filter={"_id":ObjectId(id)})
        serialiseDoc = self.serialise_document(document=foundDoc)
        return serialiseDoc
    
    def serialise_document(self,document):
        document["_id"] = document["_id"].__str__()
        return document



    
