import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo, pymongo
from bson.objectid import ObjectId
from datetime import date, datetime
from os import path
from passlib.hash import sha256_crypt
from app import app

mongo = PyMongo(app)

# create a new training plan page.
@app.route('/add_plan')
def add_plan():
    return render_template('addplan.html')

# insert training plan 
@app.route('/insert_training_plan', methods=["POST"])
def insert_training_plan():
        # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    users = mongo.db.users
    login_user = users.find_one({'username' : currentUser})
    weekDayList = ['mon','tue','wed','thur','fri','sat','sun']
    weekCount = 1
    plan_name = request.form['plan_name']
    session_type = request.form['session_type']
    training_plan_array_weeks = []
    training_plan_dict = {'plan_name' : plan_name, 'session_type': session_type,'creator': login_user.get('username'),  'weeks': training_plan_array_weeks}
    weekTrue = True
    while weekTrue:
        weekTrue = False
        week_label = 'week_' + str(weekCount)
        weekArray = []
        weekDict = { week_label : weekArray }
        for day in weekDayList:
            dayCheck = str(day) + '_week_' + str(weekCount) +  '_exercise_1'
            sets_target = str(day) + '_week_' + str(weekCount) + '_sets_1'
            reps_target = str(day) + '_week_' + str(weekCount) + '_reps_1'
            rest_target = str(day) + '_week_' + str(weekCount) + '_rest_1'
            try:
                if request.form[dayCheck]:
                    def counting_rows():
                            row_count = 1
                            while True:
                                sessionExercise = str(day) + '_week_' + str(weekCount) +  '_exercise_' + str(row_count)
                                try:
                                    if request.form[sessionExercise]:
                                        row_count += 1
                                        continue
                                except:
                                    break
                            return row_count
                    def day_to_dict():    
                        row_count = counting_rows()
                        session_row_return = []
                        for row in range(1, row_count):
                            exercise = str(day) + '_week_' + str(weekCount) + '_exercise_' + str(row)
                            sets = str(day) + '_week_' + str(weekCount) + '_sets_' + str(row)
                            reps = str(day) + '_week_' + str(weekCount) + '_reps_' + str(row)
                            rest = str(day) + '_week_' + str(weekCount) + '_rest_' + str(row)
                            session_exercise = request.form[exercise]
                            session_sets = request.form[sets]
                            session_reps = request.form[reps]
                            session_rest = request.form[rest]
                            store_name_exercise = 'exercise_' + str(row)
                            store_name_sets = 'sets_' + str(row)
                            store_name_reps = 'reps_' + str(row)
                            store_name_rest = 'rest_' + str(row)
                            sessionDict = { store_name_exercise: session_exercise, store_name_sets : session_sets, store_name_reps : session_reps, store_name_rest : session_rest }
                            session_row_return.append(sessionDict)
                        return session_row_return

                    row_count = counting_rows()
                    training_plan = day_to_dict()
                    dayDict = {'day': day, 'training_plan': training_plan}  
                    weekArray.append(dayDict)                   
                    weekTrue = True
            except:
                training_plan = 'Rest Day'
                dayDict = {'day': day, 'training_plan': training_plan}  
                weekArray.append(dayDict)
                continue
        if weekTrue:
            training_plan_array_weeks.append(weekDict)
            weekCount += 1
    mongo.db.trainingPlans.insert_one(training_plan_dict)
    return redirect(url_for('training_plans'))

@app.route('/training_plans')
def training_plans():
        # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    unitVar = currentUsersAccount.get('selected_unit')
    training_plans_DB = mongo.db.trainingPlans.find()

    return render_template('trainingplans.html', trainingPlans=training_plans_DB,  currentUsersAccount=currentUsersAccount)

# delete a training plan from the main training plan page
@app.route('/delete_plan/<plan_id>')
def delete_plan(plan_id): 
    mongo.db.trainingPlans.remove({'_id': ObjectId(plan_id)})
    return redirect(url_for('training_plans'))

@app.route('/add_weight/<plan_id>')
def add_weight(plan_id):
    # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    unitVar = currentUsersAccount.get('selected_unit')
    plan = mongo.db.trainingPlans.find_one({'_id': ObjectId(plan_id)})
    return render_template('addingweighttoplan.html', plan=plan, unitVar=unitVar)

@app.route('/start_plan/<plan_id>', methods=['POST'])
def start_plan(plan_id):
     # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    # find the training plan choosen by the user
    plan = mongo.db.trainingPlans.find_one({'_id': ObjectId(plan_id)})
    # adding the weight column on the table
    week_count = len(plan['weeks'])
    day_list = ['mon', 'tue', 'wed', 'thur','fri', 'sat', 'sun']
    users_weight_choosen = []
    for weekCount in range(week_count):
        for count, day in enumerate(day_list):
            # This will check for 100 rows on each day for each week.
            for x in range(100):
                form_weight = 'weight_' + str(day) + '_' +  str(x + 1) + '_week_' + str(weekCount + 1)
                try:
                    weight_value = request.form[form_weight]
                    users_weight_choosen.append(int(weight_value))
                except:
                    continue
    started_plan = {'username': currentUsersAccount.get('username'), 'training_plan': plan, 'users_weight': users_weight_choosen }
    mongo.db.trainingPlansStarted.insert_one(started_plan)
    return redirect(url_for('personal_trainingplans'))

@app.route('/personal_trainingplans')
def personal_trainingplans():
           # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    unitVar = currentUsersAccount.get('selected_unit')
    # finding the users training plan

    training_plans_DB = mongo.db.trainingPlansStarted.find({'username': currentUser})
    plan_count = 0
    for x in training_plans_DB:
        plan_count += 1
    training_plans_DB = mongo.db.trainingPlansStarted.find({'username': currentUser})
    return render_template('personalplans.html', unitVar=unitVar, trainingPlans=training_plans_DB, plan_count=plan_count, currentUsersAccount=currentUsersAccount)

# delete a training plan
@app.route('/delete_trainingplan/<plan_id>')
def delete_trainingplan(plan_id): 
    mongo.db.trainingPlansStarted.remove({'_id': ObjectId(plan_id)})
    return redirect(url_for('personal_trainingplans'))

# adding a session from a training plan
@app.route('/add_session_from_plan/<workout_id>')
def add_session_from_plan(workout_id):
       # to find out if the user is already logged in
    try:
        currentUser = session['username']
    except:
        return redirect(url_for('login_page'))
    user = mongo.db.users
    currentUsersAccount = user.find_one({'username': currentUser})
    unitVar = currentUsersAccount.get('selected_unit')


    return render_template('addsessionfromplan.html', unitVar=unitVar, workout_id=workout_id)