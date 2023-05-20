from db import Collection


class Device:
    def __init__(self, hardware, address, name):
        self.hardware = hardware
        self.address = address
        self.name = name
        self.id = None
        self.collection = Collection('device')

    def add_device(self) -> dict[bool, str | None, str | None]:
        docExists = self.collection.find_one({"name": self.name})

        if docExists:
            return {"success": False, "id": None, "message": "Device name already exists"}

        documentId = self.collection.add(
            {"name": self.name, "hardware": self.hardware, "address": self.address})

        self.id = documentId
        return {"success": True, "id": self.id}
