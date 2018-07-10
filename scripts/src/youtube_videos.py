# stb lib
import json
import os

# third party imports
import requests
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

# Please ensure that you have enabled the YouTube Data API for your project.
DEVELOPER_KEY = os.getenv("DEVELOPER_KEY")
VIDEOS_ENDPOINT = os.getenv("VIDEOS_ENDPOINT")
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"

CHANNELS = ["UCPJftRZO3wYmXLpvfRJtPhQ"]

youtube = build(
    YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY
)


def _process_videos():
    """Requests videos for all listed channels.
    """
    for channel in CHANNELS:
        videos = _get_search_results(channel)

        for video in videos:
            type = video["id"]["kind"]
            if type != "youtube#video":
                continue

            video_payload = _transform_video(video)
            _post_payload(video_payload)


def _get_search_results(channel, pageToken=None):
    """Recursively fetches all videos for a channel until the last page of results
    has been processed.
    """
    if pageToken:
        search_results = (
            youtube.search()
            .list(
                part="id,snippet", channelId=channel, maxResults=50, pageToken=pageToken
            )
            .execute()
        )
    else:
        search_results = (
            youtube.search()
            .list(part="id,snippet", channelId=channel, maxResults=50)
            .execute()
        )

    nextPageToken = search_results.get("nextPageToken", None)
    if nextPageToken:
        return search_results["items"] + _get_search_results(channel, nextPageToken)

    return search_results["items"]


def _transform_video(video):
    identifier = video["id"]
    snippet = video["snippet"]

    id = identifier["videoId"]
    name = snippet["title"]
    created = snippet["publishedAt"]
    video_id = identifier["videoId"]
    description = snippet["description"]
    channel = snippet["channelTitle"]
    source = "youtube"

    url = f"https://www.youtube.com/watch?v={video_id}"

    data = {
        "id": id,
        "name": name,
        "created": created,
        "url": url,
        "description": description,
        "channel": channel,
        "source": source,
    }

    return data


def _post_payload(payload):
    r = requests.post(
        VIDEOS_ENDPOINT,
        headers={"Content-type": "application/json"},
        data=json.dumps(payload),
    )
    print(r.status_code)


if __name__ == "__main__":
    try:
        _process_videos()
    except HttpError as e:
        print("An HTTP error %d occurred:\n%s" % (e.resp.status, e.content))
