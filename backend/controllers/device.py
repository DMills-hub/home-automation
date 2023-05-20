from model.device import Device
from api import app
from flask import request


@app.route('/api/device/add', methods=['POST'])
def add():
    json = request.get_json()
    hardware = json['hardware']
    address = json['address']
    name = json['name']
    device = Device(hardware=hardware, address=address, name=name,id=None)
    device = device.add_device()
    return device


@app.route('/api/device/delete', methods=['POST'])
def delete():
    json = request.get_json()
    id = json['id']
    device = Device(id=id, hardware=None, name=None, address=None)
    deleted = device.delete_device()

    if deleted:
        return {"success": True}

    return {"success": False}
