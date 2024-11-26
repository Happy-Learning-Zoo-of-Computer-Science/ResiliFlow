from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route("/")
def index():
    return "Hello from Flask!"


@app.route("/data")
def data():
    return jsonify({"message": "This is data from Flask"})


if __name__ == "__main__":
    app.run(debug=True, port=5000)


# flask cors localhost 3000
