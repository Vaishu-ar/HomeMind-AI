from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Temporary device storage
devices = []

# Home test
@app.route("/")
def home():
    return "HomeMind AI Backend Running"

# Backend connection test
@app.route("/status")
def status():
    return {"message": "Backend Connected Successfully"}

# Get all devices
@app.route("/devices", methods=["GET"])
def get_devices():
    return jsonify(devices)

# Add new device
@app.route("/add_device", methods=["POST"])
def add_device():
    data = request.json

    device = {
        "name": data["name"],
        "status": data["status"]
    }

    devices.append(device)

    return jsonify({
        "message": "Device Added Successfully",
        "device": device
    })

# Update device status
@app.route("/update_device", methods=["PUT"])
def update_device():
    data = request.json

    for device in devices:
        if device["name"] == data["name"]:
            device["status"] = data["status"]
            return jsonify({
                "message": "Device Status Updated",
                "device": device
            })

    return jsonify({"message": "Device Not Found"})

# Delete device
@app.route("/delete_device", methods=["DELETE"])
def delete_device():
    data = request.json

    for device in devices:
        if device["name"] == data["name"]:
            devices.remove(device)
            return jsonify({"message": "Device Deleted Successfully"})

    return jsonify({"message": "Device Not Found"})


if __name__ == "__main__":
    app.run(debug=True)