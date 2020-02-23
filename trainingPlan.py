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
    weekDayList = ['mon','tue','wed','thur','fri','sat','sun']
    weekCount = 1
    plan_name = request.form['plan_name']
    session_type = request.form['session_type']
    difficulty = request.form['difficulty']
    enjoyment = request.form['enjoyment']
    training_plan_array_weeks = []
    training_plan_dict = {'plan_name' : plan_name, 'session_type': session_type, 'difficulty' : difficulty , 'enjoyment' : enjoyment, 'weeks': training_plan_array_weeks}
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
    return render_template('trainingplans.html', trainingPlans=training_plans_DB, unitVar=unitVar )

@app.route('/start_plan')
def start_plan():
    return redirect(url_for('personal_trainingplans'))

@app.route('/personal_trainingplans')
def personal_trainingplans():
    return render_template('personalplans.html')