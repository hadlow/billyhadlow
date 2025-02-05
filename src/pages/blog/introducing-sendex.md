---
layout: '../../layouts/Post.astro'
title: 'Introducing Sendex'
description: 'Sendex is an API testing tool that uses YAML files for configuration'
pubDate: '2025-02-05'
tags: ["api", "postman", "go", "sendex", "end-to-end-testing"]
---

For the past few months I have been working on a Go based CLI tool called [Sendex](https://sendex.dev). Sendex is an API testing tool that uses YAML files for configuration. This can be used either as a lightweight alternative to [Postman](https://www.postman.com), or as an [end-to-end API testing](https://sendex.dev/learn-more/testing/) tool that can integrate with your CI/CD pipelines.

## How does it work?

Sendex uses YAML files for each request, so you'd start by creating a YAML file. There is a command to do this, but for now you could manually create a file with this contents (named `get-todo.yml`:

```yaml
args:
  - id: 1 # specify 1 as default
method: GET
endpoint: http://jsonplaceholder.typicode.com/todos/{id} # we can use 'id' here
headers:
  - Content-Type: application/json
  - Accept: application/json
whitelist-headers: # only show these headers in the output
  - Content-Type
```

Most of this should be pretty self explanatory, but `args` lets you specify custom parameters when calling the `run` command.

For example, this would be ran with the command:

```sh
sendex run get-todo.yml id=5
```

Which would then give us the output:

```json
200 OK
Content-Type: application/json; charset=utf-8
{
  "userId": 1,
  "id": 5,
  "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
  "completed": false
}
```

Sendex let's you save files too, just use the `save` command instead of `run`.

Putting all this together, you can also write end-to-end tests for your backend. This bash script shows how you could do that:

```sh
output=$(sendex run tests/get-todo.yml --raw)
desired_output=$(cat tests/get-todo.output)

if [ "$output" = "$desired_output" ]; then
    echo "PASS: get-todo matches expected output"
else
    echo "FAIL: get-todo does not match output"
    exit 1
fi
```

This gives you a taste of what you can do with Sendex. To see more, take a look at the [Sendex Docs](https://sendex.dev/getting-started/intro/).

If you like Sendex, give it a [star on GitHub](https://github.com/hadlow/sendex)!
