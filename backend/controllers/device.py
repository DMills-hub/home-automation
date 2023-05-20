from model.device import Device
from api import app
from flask import request


@app.route('/api/device/add', methods=['POST'])
def add():
    json = request.get_json()
    hardware = json['hardware']
    address = json['address']
    name = json['name']
    device = Device(hardware=hardware, address=address, name=name)
    device = device.add_device()
    return device
