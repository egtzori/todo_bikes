# Example todo api
A simple nodejs/typescript project assignment to create API for todo app

## Files & directories
In `./api/` there is a nodejs project serving the API
In the main folder there is Makefile containing commands to start the database

To start the database (in docker container) do:
`make db_start`

To stop the database do:
`make db_stop`

To test the database connection in commandline do:
`make db_connect`

This will pull Postgres 9.6 and expose it on port 5439
Username: postgres
Password: admin@123999

API will read and write to table `todos` in the default database `postgres`

## OpenAPI
Swagger suport was added to url `/docs`, check both images for example
![Swagger overview](https://github.com/egtzori/todo_bikes/blob/master/swagger-full.jpg)


## Two factor
This API is protected by dummy two factor authentication.
All todo APIs need valid JWT token.
To generate JWT token you need to send POST request to `/idp` API with json body like
```
{
    "challenge": 234,
    "code": 1234
}
```

The dummy two factor authenticator's algorithm is simple.
To get the response code add 1000 to the challenge.

JWT must be provided as `Authorization: Bearer {{token}}` header

## Todo API

### List all todos
To get the list of all todos, issue GET request to `/`.
No parameters needed.

Example response:
```
[
    {
        "id": "1",
        "description": "todo1",
        "done": false
    }
]
```


### Add todo
To add todo, issue POST request to `/`.
You must send JSON body with parameter `description`.
The todo's id will be auto generated and will default to `not done` (done = false)

Example request body to send:
```
{
    "description": "New todo to be added"
}
```

Encoding must be set to JSON


### Update todo
The update api allows to change the done state of a todo.
To do so, issue a PUT request to `/`

Example request body to send:
```
{
    "id": 3,
    "done": true
}
```

### Delete todo
To remove a todo from the database, issue a DELETE request with the JSON encoded `id` in the body.
Example request body to delete todo with id 6:
```
{
    "id": 6
}
```

## Postman
An example postman collection can be found in the root folder.
It has 5 items.
One to get the JWT and the 4 CRUD methods.
Be sure to edit the Postman's environment and set the variable `host` to point to the API


### Start the backend API server
To start it, go to folder `api/`
First install all node modules with `yarn`
It supports the following yarn targets:
```
watch
test
test:watch
build
```

To run the backend run `yarn watch`

*the database must be up and running before starting the api*

