import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS
from multiprocessing import freeze_support

app = Flask(__name__)

# Enable CORS for all routes and allow all origins
CORS(app)


@app.route("/")
def index():
    return "Hello from Flask!"


@app.route("/data")
def data():
    return jsonify({"message": "This is data from Flask"})


# if __name__ == "__main__":
#     app.run(port=5174, use_reloader=False)


if __name__ == "__main__":
    freeze_support()  # Required for PyInstaller executables
    app.run(port=5174, use_reloader=False)
