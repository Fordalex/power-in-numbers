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

@app.route('/')
def home():
    unitVar = request.cookies.get('unit')
    return render_template("home.html", sessions=mongo.db.sessions.find(), unit=unitVar)

@app.route('/add_unit',  methods=['POST'])
def add_unit():
    unitVar = request.cookies.get('unit')
    unitValue = request.form["unit"]
    res = make_response(redirect(url_for('home')))
    res.set_cookie('unit', unitValue)
    return res

@app.route('/insert_session', methods=['POST'])
def insert_session():
    sessions = mongo.db.sessions
    age = request.form['age']
    body_weight = request.form['body_weight']
    bw_unit = request.form['bw_unit']
    date = request.form['date']
    difficulty = request.form['difficulty']
    effort = request.form['effort']
    first_name = request.form['first_name']
    gender = request.form['gender']
    last_name = request.form['last_name']
    length_hour = request.form['length_hour']
    length_min = request.form['length_min']
    location = request.form['location']
    motivated = request.form['motivated']
    notes = request.form['notes']
    session_exercise_1 = request.form['session_exercise_1']
    session_sets_1 = request.form['session_sets_1']
    session_type = request.form['session_type']
    session_weight_1 = request.form['session_weight_1']
    weight_unit = request.form['weight_unit']
    sessionDict = {
                    "age": age, 
                    "body_weight": body_weight, 
                    "bw_unit": bw_unit, 
                    "date": date, 
                    "difficulty": difficulty, 
                    "effort": "", 
                    "first_name": "John", 
                    "gender": "Male", 
                    "last_name": "Smith", 
                    "length_hour": "", 
                    "length_min": "", 
                    "location": "", 
                    "motivated": "", 
                    "notes": "", 
                    "session_exercise": [{'session_exercise_1' : session_exercise_1,'session_sets_1':session_sets_1,'session_weight_1': session_weight_1 },{'session_exercise_1' : session_exercise_1,'session_sets_1':session_sets_1,'session_weight_1': session_weight_1 }],
                    "session_type": "Powerlifting", 
                    "weight_unit": "lb"
}
    sessions.insert_one(sessionDict)
    return redirect(url_for('home'))

@app.route('/delete_session/<session_id>')
def delete_session(session_id):
    mongo.db.sessions.remove({'_id': ObjectId(session_id)})
    return redirect(url_for('home'))

@app.route('/users_details')
def users_details():
    return render_template('addsession.html')

if __name__ == '__main__':
    app.run(host=os.getenv("IP", "0.0.0.0"),
            port=int(os.getenv("PORT", "5000")), debug=True)