import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo, pymongo
from bson.objectid import ObjectId
from datetime import date, datetime
from os import path
from passlib.hash import sha256_crypt
from app import app

mongo = PyMongo(app)

# used to edit all the sessions
# @app.route('/update_sessions')
# def change_sessions():
#     sessions = mongo.db.sessions.find()
#     for ses in sessions:
#         sessionId = ses.get('_id')
#         dateSortNo = ses.get('dateSortNo')
#         timeVar = ses.get('time')
#         session_unit = ses.get('session_unit')
#         session_rows = ses.get('session_rows')
#         bw_unit = ses.get('bw_unit')
#         body_weight = ses.get('body_weight')
#         session_type = ses.get('session_type')
#         age = ses.get('age')
#         gender = ses.get('gender')
#         username = ses.get('username')
#         notes = ses.get('notes')
#         training_session = ses.get('training_session')
#         location = ses.get('location')
#         date = ses.get('date')
#         length_hour = ses.get('length_hour')
#         length_min = ses.get('length_min')
#         length_sec = ses.get('length_sec')
#         motivated = ses.get('motivated')
#         effort = ses.get('effort')
#         difficulty = ses.get('difficulty')

#         mongo.db.sessions.update({'_id': sessionId},{
#             'session_unit' : session_unit,
#             'session_rows' : session_rows,
#             'bw_unit' : bw_unit,
#             'body_weight' : body_weight,
#             'session_type' : session_type,
#             'age' : age,
#             'gender': gender,
#             'username' : username,
#             'notes' : notes,
#             'training_session' : training_session,
#             'location' : location,
#             'date' : date,
#             'dateSortNo' : int(dateSortNo),
#             'length_hour' : length_hour,
#             'length_min' : length_min,
#             'length_sec' : length_sec,
#             'motivated' : motivated,
#             'effort' : effort,
#             'difficulty' : difficulty,
#             'time' : timeVar,
#             'gender': 'Male'
#         })
#     return 