### Running one off scripts

Allows scripts/tasks to be run in environments specific docker containers.

```bash
docker-compose -f docker-compose-dev.yml build events-task
docker-compose -f docker-compose-dev.yml run events-task python scripts/test.py
```

```python
from project.scripts import meetup_tool as tool

tool.create_meetups()
```
