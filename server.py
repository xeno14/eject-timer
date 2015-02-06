from flask import Flask
from flask import render_template
import subprocess

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("index.html")

@app.route("/eject")
def eject():
    try:
        ret = subprocess.call(["eject"])
        if ret == 0:
            return "Eject!!"
        else:
            return "Eject Failed!!"
    except Exception as e:
        return str(e)

@app.route("/close")
def eject_close():
    try:
        ret = subprocess.call(["eject", "-t"])
        if ret == 0:
            return "Close!!"
        else:
            return "Close Failed!!"
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.debug = True
    app.run(host="0.0.0.0")
