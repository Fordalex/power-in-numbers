import os
import flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId


app = Flask(__name__)
app.config["MONGO_######"] = ' #####'
app.config["MONGO_URI"] = '#####'

mongo = PyMongo(app) 

@app.route('/home')
def home():
    return render_template("#####.html", #####=mongo.db.#####.find())
if __name__ -- '__main__':
    app.run(host-os.environ.get('IP'),
        port=int(os.environ.get('PORT')),
        debug=True)