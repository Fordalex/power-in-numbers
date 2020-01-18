import os
from flask import Flask, render_template, redirect, request, url_for, make_response
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from os import path
if path.exists("env.py"):
    import env

app = Flask(__name__)
pinDB = os.environ.get('pinDB') 

app.config["MONGO_DBNAME"] = 'task_manager'
app.config["MONGO_URI"] = pinDB

mongo = PyMongo(app)

@app.route('/unit/<unitValue>')
def set_unit(unitValue):
    response = make_response('Setting cookie')
    response.set_cookie('unit', unitValue)
    return response

@app.route('/unit/show')
def show_unit():
    unit = request.cookies.get('unit')
    return 'The unit is ' + unit

@app.route('/')
def home():
    unitVar = request.cookies.get('unit')
    print(unitVar)
    return render_template("home.html", sessions=mongo.db.sessions.find(), unit=unitVar)

@app.route('/add_session')
def add_session():
    return render_template("addsession.html")

@app.route('/insert_session', methods=['POST'])
def insert_session():
    sessions = mongo.db.sessions
    sessions.insert_one(request.form.to_dict())
    return redirect(url_for('home'))

@app.route('/records')
def records():
    return render_template("records.html", records=mongo.db.records.find())

@app.route('/add_record')
def add_record():
    return render_template("addrecord.html")

@app.route('/insert_record', methods=['POST'])
def insert_record():
    records = mongo.db.records
    records.insert_one(request.form.to_dict())
    return redirect(url_for('records'))

if __name__ == '__main__':
    app.run(host=os.getenv("IP", "0.0.0.0"),
            port=int(os.getenv("PORT", "5000")), debug=True)