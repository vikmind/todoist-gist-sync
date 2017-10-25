# todoist-gist-sync

Microservice to keep logs of completed Todoist tasks in GitHub gist

## Configuration

### Environment variables

1. ``HOOK_URL`` is the path to make requests
1. ``HOOK_KEY`` is another checking that goes in request body
1. ``GITHUB_KEY`` GitHub token for [Gist access](https://github.com/settings/tokens/new)
1. ``GIST_ID`` Create Gist for storage manually, because service intended to not have own memory to store created gist id.

### IFTTT hook configuration

#### 1. Event

"Todoist: task in Any Project marked as complete"

#### 2. Action

"Webhook: make a web request"

URL: ``https://project.now.sh/HOOK_URL``

Method: ``POST``

Content Type: ``application/json``

Body

```json
{"key": "HOOK_KEY", "project": "{{Project}}", "task": "{{TaskContent}}"}
```

### Deployment on now.sh

TODO
