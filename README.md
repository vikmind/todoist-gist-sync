# todoist-gist-sync

Microservice to keep logs of completed Todoist tasks in GitHub gist through IFTTT hook

## Configuration

### Environment variables

1. ``HOOK_URL`` is the path to make requests
1. ``HOOK_KEY`` is another checking that goes in request body, see below
1. ``GITHUB_KEY`` GitHub token for [Gist access](https://github.com/settings/tokens/new)
1. ``GIST_ID`` Create Gist for storage manually, because service intended to not have own memory to store created gist ID

### [IFTTT applet configuration](https://ifttt.com/create)

#### 1. Event

"Todoist: task in Any Project marked as complete"

#### 2. Action

"Webhook: make a web request"

URL: ``https://<PROJECT>.now.sh/<HOOK_URL>``

Method: ``POST``

Content Type: ``application/json``

Body

```json
{"key": "<HOOK_KEY>", "project": "{{Project}}", "task": "{{TaskContent}}"}
```

### Deployment on now.sh

Create file ``now.json`` and fill it with environment variables, like

```json
{
  "env": {
    "HOOK_URL": "hello_world_of_microservices",
    "HOOK_KEY": "another_secret_string",
    "GITHUB_KEY": "Your GitHub acesss key",
    "GIST_ID": "Your Gist ID"
  }
}
```

Next steps:

1. Install [now client](https://zeit.co/download)
1. Authorize it, see [guide](https://zeit.co/now#get-started) for details
1. Deploy with ``now`` command
1. Use URL in IFTTT applet configuration

[How to use it for geeky task logging](https://github.com/vikmind/notes-template)
