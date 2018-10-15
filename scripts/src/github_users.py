import os
import requests
from math import ceil
import json

from github import Github

DEFAULT_PAGE_SIZE = 100

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
LOCATION = os.getenv("LOCATION", "Belfast")
DEVELOPERS_ENDPOINT = os.getenv("DEVELOPERS_ENDPOINT")

g = Github(GITHUB_TOKEN, per_page=DEFAULT_PAGE_SIZE)


def get_developers():
    """Gets developers from the Farset labs google calendar."""
    users = g.search_users("", location=LOCATION)

    total_users = users.totalCount
    number_of_pages = total_users / DEFAULT_PAGE_SIZE

    for page_number in range(0, ceil(number_of_pages)):
        print(f"loading page {page_number}")
        developers = [developer for developer in users.get_page(page_number)]

        transformed_developers = [_transform_developer(e) for e in developers]
        _post_payloads(transformed_developers)


def _transform_developer(data):
    developer = {
        "avatar": data.avatar_url,
        "login": data.login,
        "name": data.name,
        "location": data.location,
        "gists": data.public_gists,
        "repositories": data.public_repos,
        "url": data.url,
        "followers": data.followers,
        "company": data.company if data.company else "",
        "blog": data.blog if data.blog else "",
        "bio": data.bio if data.bio else "",
        "topics": [],
        "source": "github",
    }

    return developer


def _post_payloads(payloads):
    for payload in payloads:
        r = requests.post(
            DEVELOPERS_ENDPOINT,
            headers={"Content-type": "application/json"},
            data=json.dumps(payload),
        )
        print(r.status_code)


if __name__ == "__main__":
    get_developers()
