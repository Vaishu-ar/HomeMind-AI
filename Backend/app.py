from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
CORS(app)

# ---------------- DATABASE CONFIG ----------------
BASE_DIR = os.path.abspath(os.path.dirname(__file__))

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(BASE_DIR, "homemind.db")
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

# ---------------- USER TABLE ----------------
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

# ---------------- DEVICE TABLE ----------------
class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), nullable=False)

# ---------------- CREATE DATABASE ----------------
with app.app_context():
    db.create_all()

# ---------------- HOME ----------------
@app.route("/")
def home():
    return "HomeMind AI Backend Running"

# ---------------- STATUS ----------------
@app.route("/status")
def status():
    return jsonify({
        "message": "Backend Connected Successfully"
    })

# ---------------- REGISTER API ----------------
@app.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return jsonify({
            "success": False,
            "message": "No JSON Data Received"
        }), 400

    existing_user = User.query.filter_by(username=data["username"]).first()

    if existing_user:
        return jsonify({
            "success": False,
            "message": "Username already exists"
        })

    new_user = User(
        name=data["name"],
        email=data["email"],
        username=data["username"],
        password=data["password"]
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Registration Successful"
    })


# ---------------- LOGIN API ----------------
@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    user = User.query.filter_by(
        username=data["username"],
        password=data["password"]
    ).first()

    if user:
        return jsonify({
            "success": True,
            "name": user.name,
            "username": user.username
        })

    return jsonify({
        "success": False,
        "message": "Invalid Username or Password"
    })


# ---------------- TEMP DEVICE STORAGE ----------------
devices = []

# ---------------- GET DEVICES ----------------
@app.route("/devices", methods=["GET"])
def get_devices():
    return jsonify(devices)

# ---------------- ADD DEVICE ----------------
@app.route("/add_device", methods=["POST"])
def add_device():

    data = request.get_json()

    device = {
        "name": data["name"],
        "status": data["status"]
    }

    devices.append(device)

    return jsonify({
        "message": "Device Added Successfully",
        "device": device
    })

# ---------------- UPDATE DEVICE ----------------
@app.route("/update_device", methods=["PUT"])
def update_device():

    data = request.get_json()

    for device in devices:
        if device["name"] == data["name"]:
            device["status"] = data["status"]

            return jsonify({
                "message": "Device Updated Successfully",
                "device": device
            })

    return jsonify({
        "message": "Device Not Found"
    })

# ---------------- DELETE DEVICE ----------------
@app.route("/delete_device", methods=["DELETE"])
def delete_device():

    data = request.get_json()

    for device in devices:
        if device["name"] == data["name"]:
            devices.remove(device)

            return jsonify({
                "message": "Device Deleted Successfully"
            })

    return jsonify({
        "message": "Device Not Found"
    })

# ---------------- RUN SERVER ----------------
if __name__ == "__main__":
    app.run(debug=True)