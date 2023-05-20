from db import Collection
from bson import ObjectId

class Device:
    def __init__(self, hardware: str | None, address: str | None, name: str | None, id: str | None):
        self.hardware = hardware
        self.address = address
        self.name = name
        self.id = id
        self.collection = Collection('device')

    def add_device(self) -> dict[bool, str | None, str | None]:
        docExists = self.collection.find_one({"name": self.name})

        if docExists:
            return {"success": False, "id": None, "message": "Device name already exists"}

        documentId = self.collection.add(
            {"name": self.name, "hardware": self.hardware, "address": self.address})

        self.id = documentId
        return {"success": True, "id": self.id}

    def delete_device(self):
        count = self.collection.delete(self.id)
        return count == 1
    def find_device(self):
        foundDevice = self.collection.find_by_id(self.id)
        return foundDevice