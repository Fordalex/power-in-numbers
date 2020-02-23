import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo, pymongo
from bson.objectid import ObjectId
from datetime import date
from os import path
from passlib.hash import sha256_crypt
from app import app

mongo = PyMongo(app)

# register page
@app.route('/register')
def register():
    return render_template('register.html')

# send the register form to mongoDB
@app.route('/register_insert', methods=['POST', 'GET'])
def register_insert():
    if request.method == 'POST':
        users = mongo.db.users
        existing_user = users.find_one({'username' : request.form['username']})

        if existing_user is None:
            hashpass = sha256_crypt.encrypt(request.form['pwd1'])
            username = request.form['username']
            age = request.form['age']
            first_name = request.form['first_name']
            last_name = request.form['last_name']
            gender = request.form['gender']
            body_weight = request.form['body_weight']
            bw_unit = request.form['bw_unit']
            location = request.form['location']
            start_date = str(date.today())
            dateYear = start_date[2: 4]
            dateMonth = start_date[5:7]
            dateDay = start_date[8:10]
            start_date = dateDay + '-' + dateMonth + '-' + dateYear
            users.insert_one({
                'username' : username, 
                'start_date': str(start_date), 
                'password' : hashpass, 
                'age': age, 
                'gender': gender, 
                'body_weight': body_weight, 
                'bw_unit': bw_unit, 
                'location': location, 
                'first_name': first_name.capitalize(), 
                'last_name': last_name.capitalize(),  
                'selected_unit': 'kg', 
                'selected_distance': 'mile',})
            session['username'] = request.form['username']
            return redirect(url_for('profile'))
        return redirect(url_for('register'))
    return redirect(url_for('login_page'))

# try and log the user in
@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    login_user = users.find_one({'username' : request.form['username']})
    if login_user:
        if sha256_crypt.verify(request.form['password'], login_user['password']):
            session['username'] = request.form['username']
            return redirect(url_for('profile'))
        return redirect(url_for('incorrect_login'))
    return redirect(url_for('incorrect_login'))

# incorrect password or username message
@app.route('/incorrect_login')
def incorrect_login():
    return render_template('incorrectpassword.html')

# remove users account and sessions from the DB
@app.route('/delete_account')
def delete_account():
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    usersSession = mongo.db.sessions.find({'username': currentUser})
    for s in usersSession:
        mongo.db.sessions.remove(s)
    mongo.db.users.remove(login_user)
    return redirect('login_page')