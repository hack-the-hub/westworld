# import PyGithub
from github import Github

DEFAULT_PAGE_SIZE = 100

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
LOCATION = os.getenv("LOCATION")

g = Github(GITHUB_TOKEN, per_page=DEFAULT_PAGE_SIZE)

users = g.search_users('', location='Belfast')

total_users = users.totalCount

number_of_pages = total_users / DEFAULT_PAGE_SIZE

page = [p for p in users.get_page(0)]

avatar_url = page[0].avatar_url
login = page[0].login
name = page[0].name
location = page[0].location
id = page[0].id
public_gists = page[0].public_gists
public_repos = page[0].public_repos
url = page[0].url
followers = page[0].followers
company = page[0].company
blog = page[0].blog
bio = page[0].bio

user = {
    "avatar_url": avatar_url,
    "login": login,
    "name": name,
    "location": location,
    "id": id,
    "public_gists": public_gists,
    "public_repos": public_repos,
    "url": url,
    "followers": followers,
    "company": company,
    "blog": blog,
    "bio": bio,
}

print(user)
