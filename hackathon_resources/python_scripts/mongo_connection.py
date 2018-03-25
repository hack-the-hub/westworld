from pymongo import MongoClient


def connect():
    client = MongoClient('34.243.235.124', 27017)
    db = client.hack_the_hub
    db.authenticate('root', 'irBp2LCqPXL2', source='admin')
    return db
