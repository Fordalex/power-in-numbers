import os
from flask import Flask, render_template, redirect, request, url_for, make_response, session
from flask_pymongo import PyMongo, pymongo
from bson.objectid import ObjectId
from datetime import date
from os import path
from passlib.hash import sha256_crypt

if path.exists("env.py"):
    import env

app = Flask(__name__)
pinDB = os.environ.get('pinDB') 

app.config["MONGO_DBNAME"] = 'task_manager'
app.config["MONGO_URI"] = pinDB

mongo = PyMongo(app)

# routes
# add_session, insert_session, profile, filter_profile, delete_session
from sessions import *
# add_record, insert_record, user_records, filter_records, record, delete_record
from records import *
# register, register_insert, login, delete_account
from users import *
# /, login_page, home, filter_home, settings, add_unit, logout, update details.
from general import *
# add_plan
from trainingPlan import *

if __name__ == '__main__':
    app.secret_key = 'mysecret'
    app.run(host=os.getenv("IP", "0.0.0.0"),
            port=int(os.getenv("PORT", "5000")), debug=True)