from model.device import Device
from db import Collection
from api import app
from flask import request

@app.route('/api/device/health', methods=['POST'])
def health():
    return { "healthy": True, "message": "Device api is up." }

@app.route('/api/device/add', methods=['POST'])
def add():
    json = request.get_json()
    hardware = json['hardware']
    address = json['address']
    name = json['name']
    device = Device(hardware=hardware, address=address, name=name, id=None)
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


@app.route('/api/device/<id>', methods=['POST'])
def find(id):
    device = Device(id=id, hardware=None, name=None, address=None)
    find = device.find_device()
    return find


@app.route('/api/device/all', methods=['POST'])
def find_all():
    json = request.get_json()
    page_size = json['page_size']
    page_num = json['page_num']
    all_devices = Collection("device").find_all(
        page_size=page_size, page_num=page_num)
    return all_devices
