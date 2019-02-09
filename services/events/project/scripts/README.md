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

### Running a one off tasks

Allows arbitary python to be run against the app instance

```bash
docker-compose -f docker-compose-dev.yml build events-task
docker-compose -f docker-compose-dev.yml run events-task python manage.py shell
```
