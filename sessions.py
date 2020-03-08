import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo, pymongo
from bson.objectid import ObjectId
from datetime import date, datetime
from os import path
from passlib.hash import sha256_crypt
from app import app

mongo = PyMongo(app)

# the form to add a new session
@app.route('/add_session')
def add_session():
        # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    return render_template('add-to-db/addsession.html', user=login_user)

# sending the completed form to the DB
@app.route('/insert_session', methods=['POST'])
def insert_session():
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
    sessions = mongo.db.sessions
    # the data from the form
    date = request.form['date']
    dateYear = date[2: 4] 
    dateMonth = date[5:7]
    dateDay = date[8:10]
    date = dateDay + '-' + dateMonth + '-' + dateYear
    dateTime = str(datetime.now())
    dateSortNo = dateYear + dateMonth + dateDay + dateTime[11:13] + dateTime[14:16] + dateTime[17:19]
    length_hour = request.form['length_hour']
    length_min = request.form['length_min']
    length_sec = request.form['length_sec']
    motivated = request.form['motivated']
    effort = request.form['effort']
    difficulty = request.form['difficulty']
    session_type = request.form['session_type']
    session_unit = request.form['session_unit']
    notes = request.form['notes']
    # Changed the data being send to mongoDB, will change depending on the session_type and the rows in the table
    def counting_rows():
        row_count = 0
        while True:
            sessionExercise = 'session_exercise_' + str(row_count + 1)
            try:
                if request.form[sessionExercise]:
                    row_count += 1
                    continue
            except:
                break
        return row_count
    def weightlifting_to_dict():    
        row_count = counting_rows()
        session_row_return = []
        for row in range(1, row_count + 1):
            exercise = 'session_exercise_' + str(row)
            sets = 'session_sets_' + str(row)
            reps = 'session_reps_' + str(row)
            weight = 'session_weight_' + str(row)
            session_exercise = request.form[exercise]
            session_sets = request.form[sets]
            session_reps = request.form[reps]
            session_weight = request.form[weight]
            sessionDict = { exercise: session_exercise, sets : session_sets, reps : session_reps, weight : float(session_weight) }
            session_row_return.append(sessionDict)
        return session_row_return


    row_count = counting_rows()
    if session_type == 'weightlifting':
        training_session = weightlifting_to_dict()
    elif session_type == 'running':
        training_session = request.form['distance']
    elif session_type == 'cycling':
        training_session = request.form['distance']
    elif session_type == 'walking':
        training_session = request.form['distance']

    length_hour = request.form['length_hour']
    length_min = request.form['length_min']
    motivated = request.form['motivated']
    effort = request.form['effort']
    difficulty = request.form['difficulty']
    session_type = request.form['session_type']
    session_unit = request.form['session_unit']
    notes = request.form['notes']

    sessionDict = {
        'session_unit': session_unit, 
        'session_rows': row_count,
        'bw_unit': bw_unit, 
        'body_weight': body_weight,
        'session_type': session_type, 
        'age': age, 
        'gender': gender ,
        'username':username, 
        'notes': notes, 
        'training_session': training_session, 
        'location': location, 
        'date': date, 
        'dateSortNo': int(dateSortNo), 
        'length_hour': int(length_hour), 
        'length_min': float(length_min), 
        'length_sec': float(length_sec), 
        'motivated':motivated, 
        'effort': effort,
        'difficulty': difficulty,
        'time': dateTime[11:19]
        }
    sessions.insert_one(sessionDict)
    return redirect(url_for('profile'))


@app.route('/profile')
def profile():
    # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    # get filter info from cookies
    filter_date_cookie = request.cookies.get('filter_session_date_profile')
    filter_session_type = request.cookies.get('filter_session_type_profile')
    def filter():
        filter_dictionary = {'username': currentUser}
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
    filter_date = request.cookies.get('filter_session_date_profile')
    # sort the sessions by the date
    sortCards = request.cookies.get('sort_session_profile')
    if sortCards == 'Newest First':
        sessions = sessions.sort("dateSortNo", pymongo.DESCENDING)  
    elif sortCards == 'Oldest First':
        sessions = sessions.sort("dateSortNo", pymongo.ASCENDING)
    else:
        sessions = sessions.sort("dateSortNo", pymongo.DESCENDING)
    
     # The total distance the users has traveled by foot
    unitVar = currentUsersAccount.get('selected_unit')
    currentUser = session['username']
    allDistanceByFootMiles = mongo.db.sessions.find({'username': currentUser, 'session_type': 'running', 'session_unit': 'mile'})
    allDistanceByFootKm = mongo.db.sessions.find({'username': currentUser, 'session_type': 'running', 'session_unit': 'km'})
    # count the miles traveled on foot
    def countDistanceOnFootMiles():
        distanceCount = 0.0
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
    #
    # The total distance the users has traveled by bike
    unitVar = currentUsersAccount.get('selected_unit')
    currentUser = session['username']
    allDistanceByFootMiles = mongo.db.sessions.find({'username': currentUser, 'session_type': 'cycling', 'session_unit': 'mile'})
    allDistanceByFootKm = mongo.db.sessions.find({'username': currentUser, 'session_type': 'cycling', 'session_unit': 'km'})
    # count the miles traveled on bike
    def countDistanceOnFootMiles():
        distanceCount = 0
        for distance in allDistanceByFootMiles:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on bike
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
    totalDistanceOnBikeMiles = kmToMiles + distanceOnFootMiles
    distanceUnit = currentUsersAccount.get('selected_distance')
    if distanceUnit == 'km':
        totalDistanceOnBikeMiles = totalDistanceOnBikeMiles * 1.6093
    #
      #
    # The total distance the users has traveled by walking
    unitVar = currentUsersAccount.get('selected_unit')
    currentUser = session['username']
    allDistanceByFootMiles = mongo.db.sessions.find({'username': currentUser, 'session_type': 'walking', 'session_unit': 'mile'})
    allDistanceByFootKm = mongo.db.sessions.find({'username': currentUser, 'session_type': 'walking', 'session_unit': 'km'})
    # count the miles traveled by walking
    def countDistanceOnFootMiles():
        distanceCount = 0
        for distance in allDistanceByFootMiles:
            distanceCount = float(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled by walking
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

    # total powerlifting sessions
    totalWeightliftingSessions = mongo.db.sessions.find({'username': currentUser, 'session_type': 'weightlifting'})
    def powerliftingCount():
        count = 0
        for session in totalWeightliftingSessions:
            count = count + 1
        return count
    totalWeightliftingSessions = powerliftingCount()
    # total running sessions
    totalRunningSessions = mongo.db.sessions.find({'username': currentUser, 'session_type': 'running'})
    def runningCount():
        count = 0
        for session in totalRunningSessions:
            count = count + 1
        return count
    totalRunningSessions = runningCount()
    # total cycling sessions
    totalCyclingSessions = mongo.db.sessions.find({'username': currentUser, 'session_type': 'cycling'})
    def cyclingCount():
        count = 0
        for session in totalCyclingSessions:
            count = count + 1
        return count
    totalCyclingSessions = cyclingCount()
    # average motivated option
    def averageMotivation():
        allSessions = mongo.db.sessions.find({'username': currentUser})
        motivatedList = []
        for session in allSessions:
            motivatedValue = session.get('motivated')
            motivatedList.append(motivatedValue)
        totalNumber = 0
        for num in motivatedList:
            totalNumber = totalNumber + int(num)
        if motivatedList:
            averageNumber = totalNumber / len(motivatedList)
        else: 
            averageNumber = 0
        return averageNumber
    # total walking sessions
    totalWalkingSessions = mongo.db.sessions.find({'username': currentUser, 'session_type': 'walking'})
    def walkingCount():
        count = 0
        for session in totalWalkingSessions:
            count = count + 1
        return count
    totalWalkingSessions = walkingCount()
    # average difficulty option
    def averageDifficulty():
        allSessions = mongo.db.sessions.find({'username': currentUser})
        difficultyList = []
        for session in allSessions:
            difficultyValue = session.get('difficulty')
            difficultyList.append(difficultyValue)
        totalNumber = 0
        for num in difficultyList:
            totalNumber = totalNumber + int(num)
        if difficultyList:
            averageNumber = totalNumber / len(difficultyList)
        else:
            averageNumber = 0
        return averageNumber
    # average effort option
    def averageEffort():
        allSessions = mongo.db.sessions.find({'username': currentUser})
        effortList = []
        for session in allSessions:
            effortValue = session.get('effort')
            effortList.append(effortValue)
        totalNumber = 0
        for num in effortList:
            totalNumber = totalNumber + int(num)
        if effortList:
            averageNumber = totalNumber / len(effortList)
        else:
            averageNumber = 0
        return averageNumber
    average_motivation = averageMotivation()
    average_difficulty = averageDifficulty()
    average_effort = averageEffort()
    # count the time of the session taken into minutes
    def totalTimeSpentTrainingSecs():
        allSessions = mongo.db.sessions.find({'username': currentUser})
        secList = []
        minList = []
        hourList = []
        for session in allSessions:
            time = session.get('length_min')
            minList.append(time)
        allSessions = mongo.db.sessions.find({'username': currentUser})
        for session in allSessions:
            time = session.get('length_hour')
            hourList.append(time)
            allSessions = mongo.db.sessions.find({'username': currentUser})
        for session in allSessions:
            time = session.get('length_sec')
            secList.append(time)
        totalSecs = 0 
        totalMins = 0 
        totalHours = 0
        for time in minList:
            totalMins = totalMins + time
        for time in hourList:
            totalHours = totalHours + time
        for time in secList:
            totalSecs = totalSecs + time
        
        HoursToMin = totalHours * 60
        convertToMins = totalMins + HoursToMin
        secsToMins = totalSecs / 60

        totalTimeInSecs = (secsToMins * 60) + (convertToMins * 60)
        return totalTimeInSecs
    # Format the mins into D5:H20:M30
    def formatTimeSpent():
        timeInSecs = totalTimeSpentTrainingSecs()
        timeInMins = 0
        dayCount = 0
        hourCount = 0
        minCount = 0
        secCount = 0
        while timeInSecs >= 60:
            timeInSecs = timeInSecs - 60
            timeInMins += 1
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
    # total sessions logged
    allSessions = mongo.db.sessions.find({'username': currentUser})
    totalSessionsLogged = 0
    for ses in allSessions:
        totalSessionsLogged = totalSessionsLogged + 1
    return render_template("users-profile/profile.html", sortCards=sortCards, totalSessionsLogged=totalSessionsLogged, sessions=sessions, unit=unitVar, user=currentUsersAccount, filter_session_type=filter_session_type, filter_date=filter_date, allDistanceByFoot=round(totalDistanceOnFootMiles,1), distanceUnit=distanceUnit, totalWeightliftingSessions=totalWeightliftingSessions, totalRunningSessions=totalRunningSessions, totalCyclingSessions=totalCyclingSessions, totalDistanceOnBike=totalDistanceOnBikeMiles, totalDistanceByWalking=totalDistanceByWalkingMiles, average_motivation=average_motivation,average_difficulty=average_difficulty, average_effort=average_effort, totalTimeDays=totalTimeDays, totalTimeHours=totalTimeHours, totalTimeMins=totalTimeMins, totalWalkingSessions=totalWalkingSessions)

# filtering the session on the profile page
@app.route('/filter_profile', methods=['POST'])
def filter_profile():
    filter_session_type = request.form["filter_session_type_profile"]
    filter_date = request.form['filter_session_date_profile']
    sort = request.form['sort_session_profile']
    res = make_response(redirect(url_for('profile')))
    res.set_cookie('filter_session_type_profile', filter_session_type)
    res.set_cookie('filter_session_date_profile', filter_date)
    res.set_cookie('sort_session_profile', sort)
    return res

# delete a session from the DB
@app.route('/delete_session/<session_id>')
def delete_session(session_id):
    mongo.db.sessions.remove({'_id': ObjectId(session_id)})
    return redirect(url_for('profile'))
