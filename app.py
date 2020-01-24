import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from os import path
from passlib.hash import sha256_crypt

if path.exists("env.py"):
    import env

app = Flask(__name__)
pinDB = os.environ.get('pinDB') 

app.config["MONGO_DBNAME"] = 'task_manager'
app.config["MONGO_URI"] = pinDB

mongo = PyMongo(app)

@app.route('/')
def index():
    return redirect(url_for('login_page'))


@app.route('/login_page')
def login_page():
    return render_template('index.html')

@app.route('/home')
def home():
    unitVar = request.cookies.get('unit')
    return render_template("home.html", sessions=mongo.db.sessions.find(), unit=unitVar)


@app.route('/register')
def register():
    return render_template('register.html')

@app.route('/register_insert', methods=['POST', 'GET'])
def register_insert():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'username' : request.form['username']})

        if existing_user is None:
            hashpass = sha256_crypt.encrypt(request.form['password'])
            username = request.form['username']
            age = request.form['age']
            first_name = request.form['first_name']
            last_name = request.form['last_name']
            gender = request.form['gender']
            body_weight = request.form['body_weight']
            bw_unit = request.form['bw_unit']
            location = request.form['location']
            users.insert_one({'username' : username, 'password' : hashpass, 'age': age, 'gender': gender, 'bodyweight': body_weight, 'bw_unit': bw_unit, 'location': location, 'first_name': first_name, 'last_name': last_name})
            session['username'] = request.form['username']
            return redirect(url_for('home'))

        return render_template('index.html')

    return render_template('index.html')

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    login_user = users.find_one({'username' : request.form['username']})

    if login_user:
        if sha256_crypt.verify(request.form['password'], login_user['password']):
            session['username'] = request.form['username']
            return redirect(url_for('home'))
        else:
            return redirect(url_for('index'))

@app.route('/add_unit',  methods=['POST'])
def add_unit():
    unitVar = request.cookies.get('unit')
    unitValue = request.form["unit"]
    res = make_response(redirect(url_for('home')))
    res.set_cookie('unit', unitValue)
    return res

@app.route('/add_session')
def add_session():
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    return render_template('addsession.html', user=login_user)

##########################################

@app.route('/insert_session', methods=['POST'])
def insert_session():
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    username = login_user.get('username')
    sessions = mongo.db.sessions
    location = request.form['location']
    date = request.form['date']
    length_hour = request.form['length_hour']
    length_min = request.form['length_min']
    motivated = request.form['motivated']
    effort = request.form['effort']
    difficulty = request.form['difficulty']
    notes = request.form['notes']
    def training_session_rows():
        session_exercise_1 = request.form['session_exercise_1']
        session_sets_1 = request.form['session_sets_1']
        session_weight_1 = request.form['session_weight_1']
        return [{'session_exercise_1':session_exercise_1,'session_sets_1':session_sets_1,'session_weight_1':session_weight_1}]
    training_session = training_session_rows()
    sessionDict = {'username':username, 'notes': notes, 'training_session': training_session, 'location': location, 'date': date, 'length_hour': length_hour, 'length_min': length_min, 'motivated':motivated, 'effort': effort,'difficulty': difficulty}
    sessions.insert_one(sessionDict)
    return redirect(url_for('home'))

############################################

@app.route('/delete_session/<session_id>')
def delete_session(session_id):
    mongo.db.sessions.remove({'_id': ObjectId(session_id)})
    return redirect(url_for('home'))


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host=os.getenv("IP", "0.0.0.0"),
            port=int(os.getenv("PORT", "5000")), debug=True)