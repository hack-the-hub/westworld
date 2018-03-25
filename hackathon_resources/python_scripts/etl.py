from mongo_connection import *
import json

db = connect()


def get_docs():
    profile_docs = db.linkedin_profiles.find()
    clean_data = []
    for doc in profile_docs:
        profile = {"name": doc['name'], "url": doc['url'],
                   "skills": doc['skills'], "education": doc['education']}
        clean_data.append(profile)
    return clean_data


profiles = get_docs()
with open("clean_profiles.json", "w") as output_file:
    output_file.write(json.dumps(profiles))
