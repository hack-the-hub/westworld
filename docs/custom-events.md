Adding custom events
====================

> Muxer welcomes everyone to contribute to the goal of creating a central directory for all technology-related events in Northern Ireland.

The currently supported way to add custom events to Muxer is via a public gist on Github detailing your events as a JSON blob. This will automatically be consumed on daily basis allowing new events to be added once the URL has been submitted.

Steps
-----

1.	Creating a public gist on [Github](https://help.github.com/articles/creating-gists/)
2.	Add custom events using the expected [data format](#template)
3.	[Validate and format](https://jsonformatter.curiousconcept.com/) JSON
4.	Submit a gist URL to `@apoclyps` on the [NI Technology Slack](https://nitech.herokuapp.com/), [Twitter](https;//twitter.com), or even via [Github](https://github.com/apoclyps/my-dev-space/issues) by raising an issue against the repository to consume the new feed.

### Expected data format

```javascript
{
    "events": [{
        "name": "A name to identify the event",
        "description": "A description of the event",
        "url": "event url for booking (optional)",
        "start": "ISO-8601 formatted datetime identify when the event starts",
        "end": "ISO-8601 formatted datetime identify when the event ends",
        "duration": "The duration of the event in seconds from start to end (optional)",
        "topics": ['array of individual keywords'],
        "entry": ['free'],
        "category": "The organiser or group to categorise and group future events",
        "source": "custom",
    }]
}
```

### Example

The following example public feed is hosted on Github via a [public gist](https://gist.github.com/apoclyps/ddb57011692708617d7d4568948e14e2).

Feedback
--------

If this solution doesn't fit your needs or you have any feedback (positive or negative), let us know and we can work together on improving it.
