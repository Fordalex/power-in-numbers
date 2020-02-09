import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo, pymongo
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
    allUsers = mongo.db.users.find()
    userCount = 0
    for x in allUsers:
        userCount += 1
    return render_template('loginpage.html', userCount=userCount)

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
    filter_date = request.cookies.get('filter_session_date_home')
    filter_session_type = request.cookies.get('filter_session_type_home')
    unit_distance = currentUsersAccount.get('selected_distance')
    def filter():
        filter_dictionary = {}
        if filter_date:
            filter_dictionary.update({'date': filter_date})
        if filter_session_type:
            if filter_session_type != 'all':
                filter_dictionary.update({'session_type': filter_session_type})
        return filter_dictionary
    sessions = mongo.db.sessions.find(filter())
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
            distanceCount = int(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on foot
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = int(distance["training_session"]) + distanceCount
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
            distanceCount = int(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on foot
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = int(distance["training_session"]) + distanceCount
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
            distanceCount = int(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on foot
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = int(distance["training_session"]) + distanceCount
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

@app.route('/register')
def register():
    return render_template('register.html')

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
            users.insert_one({'username' : username, 'password' : hashpass, 'age': age, 'gender': gender, 'body_weight': body_weight, 'bw_unit': bw_unit, 'location': location, 'first_name': first_name, 'last_name': last_name,  'selected_unit': 'kg', 'selected_distance': 'mile',})
            session['username'] = request.form['username']
            return redirect(url_for('profile'))

        return redirect('login_page')

    return redirect('login_page')

@app.route('/login', methods=['POST'])
def login():
    users = mongo.db.users
    login_user = users.find_one({'username' : request.form['username']})
 
    if login_user:
        if sha256_crypt.verify(request.form['password'], login_user['password']):
            session['username'] = request.form['username']
            return redirect(url_for('profile'))
        else:
            return redirect(url_for('login_page'))

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
    filter_date = request.cookies.get('filter_date_profile')
    filter_session_type = request.cookies.get('filter_session_type_profile')
    def filter():
        filter_dictionary = {'username': currentUser}
        if filter_date:
            filter_dictionary.update({'date': filter_date})
        if filter_session_type:
            if filter_session_type != 'all':
                filter_dictionary.update({'session_type': filter_session_type})
        
        return filter_dictionary
    sessions = mongo.db.sessions.find(filter())
    
    # sort the sessions by the date
    sortCards = request.cookies.get('sort_profile')
    if sortCards == 'Newest First':
        sessions = sessions.sort("dateSortNo", pymongo.DESCENDING)
        allRecords = allRecords.sort("dateSortNo", pymongo.DESCENDING)
    elif sortCards == 'Oldest First':
        sessions = sessions.sort("dateSortNo", pymongo.ASCENDING)
        allRecords = allRecords.sort("dateSortNo", pymongo.DESCENDING)
     # The total distance the users has traveled by foot
    unitVar = currentUsersAccount.get('selected_unit')
    currentUser = session['username']
    allDistanceByFootMiles = mongo.db.sessions.find({'username': currentUser, 'session_type': 'running', 'session_unit': 'mile'})
    allDistanceByFootKm = mongo.db.sessions.find({'username': currentUser, 'session_type': 'running', 'session_unit': 'km'})
    # count the miles traveled on foot
    def countDistanceOnFootMiles():
        distanceCount = 0
        for distance in allDistanceByFootMiles:
            distanceCount = int(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on foot
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = int(distance["training_session"]) + distanceCount
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
            distanceCount = int(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled on bike
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = int(distance["training_session"]) + distanceCount
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
            distanceCount = int(distance["training_session"]) + distanceCount
        return distanceCount
    # count the km traveled by walking
    def countDistanceOnFootKm():
        distanceCount = 0
        for distance in allDistanceByFootKm:
            distanceCount = int(distance["training_session"]) + distanceCount
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
    #
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
    # total sessions logged
    allSessions = mongo.db.sessions.find({'username': currentUser})
    totalSessionsLogged = 0
    for ses in allSessions:
        totalSessionsLogged = totalSessionsLogged + 1
    return render_template("profile.html", sortCards=sortCards, totalSessionsLogged=totalSessionsLogged, sessions=sessions,Records=allRecords, unit=unitVar, user=currentUsersAccount, filter_session_type=filter_session_type, filter_date=filter_date, allDistanceByFoot=round(totalDistanceOnFootMiles,1), distanceUnit=distanceUnit, totalWeightliftingSessions=totalWeightliftingSessions, totalRunningSessions=totalRunningSessions, totalCyclingSessions=totalCyclingSessions, totalDistanceOnBike=totalDistanceOnBikeMiles, totalDistanceByWalking=totalDistanceByWalkingMiles, average_motivation=average_motivation,average_difficulty=average_difficulty, average_effort=average_effort, totalTimeDays=totalTimeDays, totalTimeHours=totalTimeHours, totalTimeMins=totalTimeMins, totalWalkingSessions=totalWalkingSessions)
    

@app.route('/usersRecords')
def usersRecords():
        # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    # get filter info from cookies
    filter_date = request.cookies.get('filter_date_profile')
    filter_session_type = request.cookies.get('filter_session_type_profile')  
    def filter():
        filter_dictionary = {'username': currentUser}
        if filter_date:
            filter_dictionary.update({'date': filter_date})
        if filter_session_type:
            if filter_session_type != 'all':
                filter_dictionary.update({'session_type': filter_session_type})
        
        return filter_dictionary
    sessions = mongo.db.sessions.find(filter())
    # sort the sessions by the date
    sortCards = request.cookies.get('sort_profile')
    if sortCards == 'Newest First':
        allRecords = allRecords.sort("dateSortNo", pymongo.DESCENDING)
    elif sortCards == 'Oldest First':
        allRecords = allRecords.sort("dateSortNo", pymongo.DESCENDING)

    return render_template('usersRecords.html' )





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
    login_user = users.find_one({'username' : currentUser})
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
        'sessions_logged': currentLogged,
        'selected_unit': unitValue,
        'selected_distance': unit_distance,
    })
    return res

# saving settings and filter in a session cookie

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

# adding session to mongoDB and the session page.

@app.route('/add_session')
def add_session():
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    return render_template('addsession.html', user=login_user)


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
    password = login_user.get('password')
    first_name = login_user.get('first_name')
    last_name = login_user.get('last_name')
    unitValue = login_user.get('selected_unit')
    unit_distance = login_user.get('selected_distance')
    sessions = mongo.db.sessions
    # add the amount of the sessions that the user has logged.
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
        'selected_unit': str(unitValue),
        'selected_distance': str(unit_distance),
    })
    # the data from the form
    date = request.form['date']
    dateYear = date[2: 4]
    dateMonth = date[5:7]
    dateDay = date[8:10]
    date = dateDay + '-' + dateMonth + '-' + dateYear
    dateSortNo = dateYear + dateMonth + dateDay
    length_hour = request.form['length_hour']
    length_min = request.form['length_min']
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
            weight = 'session_weight_' + str(row)
            session_exercise = request.form[exercise]
            session_sets = request.form[sets]
            session_weight = request.form[weight]
            sessionDict = { exercise: session_exercise, sets : session_sets, weight : int(session_weight) }
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

    sessionDict = {'session_unit': session_unit, 'session_rows': row_count,'bw_unit': bw_unit, 'body_weight': body_weight,'session_type': session_type, 'age': age, 'gender': gender ,'username':username, 'notes': notes, 'training_session': training_session, 'location': location, 'date': date, 'dateSortNo': int(dateSortNo), 'length_hour': int(length_hour), 'length_min': int(length_min), 'motivated':motivated, 'effort': effort,'difficulty': difficulty}
    sessions.insert_one(sessionDict)
    return redirect(url_for('profile'))

# adding record to mongoDB.

@app.route('/add_record')
def add_record():
    return render_template('addrecord.html')

@app.route('/record')
def record():
    records = mongo.db.records.find()
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    unitVar = login_user.get('selected_unit')
    unit_distance = login_user.get('selected_distance')
    # finding all the bench press one rep max and sorting them with the height number to the start of the list
    weightBenched = mongo.db.records.find({'training_session.session_exercise_1': 'Bench Press', 'training_session.session_sets_1': '1'})
    sortedBench = weightBenched.sort('training_session.session_weight_1', pymongo.DESCENDING)
    # finding all the Squat one rep max and sorting them with the height number to the start of the list
    weightSquat = mongo.db.records.find({'training_session.session_exercise_1': 'Squat', 'training_session.session_sets_1': '1'})
    sortedSquat = weightSquat.sort('training_session.session_weight_1', pymongo.DESCENDING)
    # finding all the Deadlift one rep max and sorting them with the height number to the start of the list
    weightDeadlift = mongo.db.records.find({'training_session.session_exercise_1': 'Deadlift', 'training_session.session_sets_1': '1'})
    sortedDeadlift = weightDeadlift.sort('training_session.session_weight_1', pymongo.DESCENDING)
    recordCount = mongo.db.records.find()
    recordCountStore = 0
    for record in recordCount:
        recordCountStore += 1
    

    return render_template('records.html', recordCount=recordCountStore, distanceUnit=unit_distance, sessions=records, unit=unitVar, weightBenched=sortedBench, sortedSquat=sortedSquat, sortedDeadlift=sortedDeadlift)

@app.route('/insert_record', methods=['POST'])
def insert_record():
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    username = login_user.get('username')
    records = mongo.db.records
    session_type = request.form['session_type']
    location = login_user.get('location')
    # current users data
    gender = login_user.get('gender')
    age = login_user.get('age')
    body_weight = login_user.get('body_weight')
    bw_unit = login_user.get('bw_unit')
    # checking the session type
    if session_type == 'weightlifting':
        training_session = {'session_exercise_1': request.form['session_exercise_1'],'session_sets_1': request.form['session_sets_1'] , 'session_weight_1': request.form['session_weight_1']}
    elif session_type == 'running':
        training_session = request.form['distance']
    elif session_type == 'cycling':
        training_session = request.form['distance']
    elif session_type == 'walking':
        training_session = request.form['distance']
    date = request.form['date']
    length_hour = request.form['length_hour']
    length_min = request.form['length_min']
    motivated = request.form['motivated']
    effort = request.form['effort']
    difficulty = request.form['difficulty'] 
    session_unit = request.form['session_unit']
    notes = request.form['notes']
    weightliftingDict = {'session_unit': session_unit,'bw_unit': bw_unit, 'body_weight': body_weight,'session_type': session_type, 'age': age, 'gender': gender ,'username':username, 'notes': notes, 'training_session': training_session, 'location': location, 'date': date, 'length_hour': int(length_hour), 'length_min': int(length_min), 'motivated':motivated, 'effort': effort,'difficulty': difficulty}
    records.insert_one(weightliftingDict)
    return redirect('record')


@app.route('/delete_session/<session_id>')
def delete_session(session_id):
    mongo.db.sessions.remove({'_id': ObjectId(session_id)})
    return redirect(url_for('profile'))

@app.route('/delete_record/<session_id>')
def delete_record(session_id):
    mongo.db.records.remove({'_id': ObjectId(session_id)})
    return redirect(url_for('profile'))

@app.route('/settings')
def settings():
    currentUser = session['username']
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    unitVar = login_user.get('selected_unit')
    unit_distance = login_user.get('selected_distance')
    return render_template('settings.html', unit=unitVar, unit_distance=unit_distance)

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

@app.route('/logout')
def logout():
    session.clear()
    response = make_response(redirect(url_for('login_page')))
    response.delete_cookie('sort_session_profile')
    response.delete_cookie('filter_session_type_profile')
    response.delete_cookie('filter_session_date_profile')
    return response
if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host=os.getenv("IP", "0.0.0.0"),
            port=int(os.getenv("PORT", "5000")), debug=True)