from flask import Flask

app = Flask(__name__)

@app.route("/")
def docker_home():
    return "Hello from Docker!"

@app.route("/gpt")
def gpt_home():
    return "Hello from GPT-OSS!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
