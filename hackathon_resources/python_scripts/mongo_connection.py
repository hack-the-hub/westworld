from pymongo import MongoClient


def connect():
    host = ''
    post = 27017
    user = ''
    password = ''
    source = ''

    client = MongoClient(host, 27017)
    db = client.hack_the_hub
    db.authenticate(user=user, password=password, source=source)
    return db
