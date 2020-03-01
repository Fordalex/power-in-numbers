import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo, pymongo
from bson.objectid import ObjectId
from datetime import date
from os import path
from passlib.hash import sha256_crypt
from app import app

mongo = PyMongo(app)

# login page
@app.route('/')
def index():
    return redirect(url_for('login_page'))

# the login page
@app.route('/login_page')
def login_page():
    allUsers = mongo.db.users.find()
    userCount = 0
    for x in allUsers:
        userCount += 1
    return render_template('loginpage.html', userCount=userCount)

# home page
@app.route('/home')
def home():
    # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    unitVar = currentUsersAccount.get('selected_unit')
    # filter cards
    filter_date_cookie = request.cookies.get('filter_session_date_home')
    filter_session_type = request.cookies.get('filter_session_type_home')
    unit_distance = currentUsersAccount.get('selected_distance')
    def filter(): 
        filter_dictionary = {}
        if filter_date_cookie:
            dateYear = filter_date_cookie[2: 4]
            dateMonth = filter_date_cookie[5:7]
            dateDay = filter_date_cookie[8:10]
            filter_date = dateDay + '-' + dateMonth + '-' + dateYear
            filter_dictionary.update({'date': filter_date})
        if filter_session_type:
            if filter_session_type != 'all':
                filter_dictionary.update({'session_type': filter_session_type})
        return filter_dictionary
    sessions = mongo.db.sessions.find(filter())
    filter_date = request.cookies.get('filter_session_date_home')
    # sort the sessions by the date
    sortCards = request.cookies.get('sort_session_home')
    if sortCards == 'Newest First':
        sessions = sessions.sort("dateSortNo", pymongo.DESCENDING)  
    elif sortCards == 'Oldest First':
        sessions = sessions.sort("dateSortNo", pymongo.ASCENDING)
    else:
        sessions = sessions.sort("dateSortNo", pymongo.DESCENDING)
    # total session logged by all users
    allSessions = mongo.db.sessions.find()
    sessionCount = 0
    for x in allSessions:
        sessionCount += 1
    # by running
     # The total distance the users has traveled by foot
    unitVar = currentUsersAccount.get('selected_unit')
    currentUser = session['username']
    allDistanceByFootMiles = mongo.db.sessions.find({'session_type': 'running', 'session_unit': 'mile'})
    allDistanceByFootKm = mongo.db.sessions.find({'session_type': 'running', 'session_unit': 'km'})
    # count the miles traveled on foot
    def countDistanceOnFootMiles():
        distanceCount = 0
        for distance in allDistanceByFootMiles:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on foot
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # convert the kms into miles then add them together
    distanceOnFootMiles = countDistanceOnFootMiles()
    distanceOnFootKm = countDistanceOnFootKm() 
    kmToMiles = distanceOnFootKm * 0.6213
    # convert the distance traveled to the users selected choice.
    totalDistanceOnFootMiles = kmToMiles + distanceOnFootMiles
    distanceUnit = currentUsersAccount.get('selected_distance')
    if distanceUnit == 'km':
        totalDistanceOnFootMiles = totalDistanceOnFootMiles * 1.6093
    # by walking
     # The total distance the users has traveled by foot
    unitVar = currentUsersAccount.get('selected_unit')
    currentUser = session['username']
    allDistanceByFootMiles = mongo.db.sessions.find({'session_type': 'walking', 'session_unit': 'mile'})
    allDistanceByFootKm = mongo.db.sessions.find({'session_type': 'walking', 'session_unit': 'km'})
    # count the miles traveled on foot
    def countDistanceOnFootMiles():
        distanceCount = 0
        for distance in allDistanceByFootMiles:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on foot
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # convert the kms into miles then add them together
    distanceOnFootMiles = countDistanceOnFootMiles()
    distanceOnFootKm = countDistanceOnFootKm() 
    kmToMiles = distanceOnFootKm * 0.6213
    # convert the distance traveled to the users selected choice.
    totalDistanceByWalkingMiles = kmToMiles + distanceOnFootMiles
    distanceUnit = currentUsersAccount.get('selected_distance')
    if distanceUnit == 'km':
        totalDistanceByWalkingMiles = totalDistanceByWalkingMiles * 1.6093
    # by bike
     # The total distance the users has traveled by foot
    unitVar = currentUsersAccount.get('selected_unit')
    currentUser = session['username']
    allDistanceByFootMiles = mongo.db.sessions.find({'session_type': 'cycling', 'session_unit': 'mile'})
    allDistanceByFootKm = mongo.db.sessions.find({'session_type': 'cycling', 'session_unit': 'km'})
    # count the miles traveled on foot
    def countDistanceOnFootMiles():
        distanceCount = 0
        for distance in allDistanceByFootMiles:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on foot
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # convert the kms into miles then add them together
    distanceOnFootMiles = countDistanceOnFootMiles()
    distanceOnFootKm = countDistanceOnFootKm() 
    kmToMiles = distanceOnFootKm * 0.6213
    # convert the distance traveled to the users selected choice.
    totalDistanceByCyclingMiles = kmToMiles + distanceOnFootMiles
    distanceUnit = currentUsersAccount.get('selected_distance')
    if distanceUnit == 'km':
        totalDistanceByCyclingMiles = totalDistanceByCyclingMiles * 1.6093
    
    totalDistanceTraveledTogether = totalDistanceByWalkingMiles + totalDistanceOnFootMiles + totalDistanceByCyclingMiles


    # count the time of the session taken into minutes
    def totalTimeSpentTrainingMins():
        allSessions = mongo.db.sessions.find({'username': currentUser})
        minList = []
        hourList = []
        for session in allSessions:
            time = session.get('length_min')
            minList.append(time)
        allSessions = mongo.db.sessions.find({'username': currentUser})
        for session in allSessions:
            time = session.get('length_hour')
            hourList.append(time)
        totalMins = 0 
        totalHours = 0
        for time in minList:
            totalMins = totalMins + time
        for time in hourList:
            totalHours = totalHours + time
        HoursToMin = totalHours * 60
        returnTimeMins = totalMins + HoursToMin
        return returnTimeMins
    # Format the mins into D5:H20:M30
    def formatTimeSpent():
        timeInMins = totalTimeSpentTrainingMins()
        dayCount = 0
        hourCount = 0
        minCount = 0
        while timeInMins >= 60:
            timeInMins = timeInMins - 60
            hourCount += 1
        while hourCount >= 24:
            hourCount = hourCount - 24
            dayCount += 1
        minCount = timeInMins
        listOfTheCount = []
        listOfTheCount.append(minCount)
        listOfTheCount.append(hourCount)
        listOfTheCount.append(dayCount)
        
        return listOfTheCount

    totalTimeList = formatTimeSpent()
    totalTimeDays = totalTimeList[2]
    totalTimeHours = totalTimeList[1]
    totalTimeMins = totalTimeList[0]
       # finding all the sessions and converting them into minutes, ready to sort.
    allRunningSessions = mongo.db.sessions.find({'session_type':'running'})
    sortRunning = allRunningSessions.sort('training_session', pymongo.DESCENDING)
    # finding all the cycling sessions and converting them into minutes, ready to sort.
    allCyclingSessions = mongo.db.sessions.find({'session_type':'cycling'})
    sortCycling = allCyclingSessions.sort('training_session', pymongo.DESCENDING)
    return render_template("home.html",sortRunning=sortRunning,sortCycling=sortCycling, totalDistance=round(totalDistanceTraveledTogether, 0), sessions=sessions, unit=unitVar, user=currentUsersAccount, filter_session_type=filter_session_type, filter_date=filter_date, distanceUnit=distanceUnit, sessionCount=sessionCount)

# filtering the session on the home page
@app.route('/filter_home', methods=['POST'])
def filter_home():
    filter_sort = request.form['sort_session_home']
    filter_session_type = request.form["filter_session_type_home"]
    filter_date = request.form['filter_session_date_home']
    res = make_response(redirect(url_for('home')))
    res.set_cookie('filter_session_type_home', filter_session_type)
    res.set_cookie('filter_session_date_home', filter_date)
    res.set_cookie('sort_session_home', filter_sort)
    return res

# the settings page
@app.route('/settings')
def settings():
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    unitVar = login_user.get('selected_unit')
    unit_distance = login_user.get('selected_distance')
    return render_template('settings.html', unit=unitVar, unit_distance=unit_distance)

# save the users setting preferences to mongoDB
@app.route('/add_unit',  methods=['POST'])
def add_unit():
    unitValue = request.form["unit"]
    unit_distance = request.form["unit_distance"]
    res = make_response(redirect(url_for('settings')))
 # current users data
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    username = login_user.get('username')
    gender = login_user.get('gender')
    age = login_user.get('age')
    location = login_user.get('location')
    body_weight = login_user.get('body_weight')
    bw_unit = login_user.get('bw_unit')
    password = login_user.get('password')
    first_name = login_user.get('first_name')
    last_name = login_user.get('last_name')
    start_date = login_user.get('start_date')
    currentSessionsLogged = login_user.get('sessions_logged')
    currentLogged = currentSessionsLogged
    mongo.db.users.update({'username' : currentUser},
    {
        'username' : username, 
        'password' : password, 
        'age': age, 
        'gender': gender, 
        'body_weight': body_weight, 
        'bw_unit': bw_unit, 
        'location': location, 
        'first_name': first_name, 
        'last_name': last_name,
        'selected_unit': unitValue,
        'selected_distance': unit_distance,
        'start_date': start_date
    })
    return res

# log the user out by removing the session cookie.
@app.route('/logout')
def logout():
    session.clear()
    response = make_response(redirect(url_for('login_page')))
    response.delete_cookie('sort_session_profile')
    response.delete_cookie('filter_session_type_profile')
    response.delete_cookie('filter_session_date_profile')
    return response

# pulling the currect users information and displaying it on the page ready to edit.
@app.route('/update_details')
def update_details():
       # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    unitVar = currentUsersAccount.get('selected_unit')


    return render_template('updatedetails.html', user=currentUsersAccount , unitVar=unitVar)

# update the users details to mongoDB
@app.route('/insert_change_details', methods=['POST'])
def insert_change_details():
    currentUser = session['username']
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    
    username = currentUsersAccount.get('username')
    password = currentUsersAccount.get('password')
    first_name = currentUsersAccount.get('first_name')
    last_name = currentUsersAccount.get('last_name')
    age = request.form['age']
    gender = currentUsersAccount.get('gender')
    body_weight = request.form['body_weight']
    bw_unit = request.form['bw_unit']
    location = currentUsersAccount.get('location')
    selected_unit = currentUsersAccount.get('selected_unit')
    selected_distance = currentUsersAccount.get('selected_distance')
    start_date = currentUsersAccount.get('start_date')

    mongo.db.users.update({'username' : currentUser},
    {
        'username' : username, 
        'password' : password, 
        'age': age, 
        'gender': gender, 
        'body_weight': body_weight, 
        'bw_unit': bw_unit, 
        'location': location, 
        'first_name': first_name, 
        'last_name': last_name,
        'selected_unit': selected_unit,
        'selected_distance': selected_distance,
        'start_date': start_date
    })
    
    return redirect(url_for('profile'))