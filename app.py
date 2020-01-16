import os
from flask import Flask, render_template, redirect, request, url_for
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("home.html" , sessions=mongo.db.session.find())

@app.route('/addsession')
def addsession():
    return render_template("addsession.html")

if __name__ == '__main__':
    app.run(host=os.getenv("IP", "0.0.0.0"),
            port=int(os.getenv("PORT", "5000")), debug=True)