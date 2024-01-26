# API Documentation

## Overview

- API doc for the Mindful app (name for now)

## Base URL

`/api/v1`

## Response
- All responses will be in JSON format

## Authentication

- Jwt Auth is used for authentication
- All endpoints are protected except for the login and register endpoints

## Endpoints

### 1. Sign up

#### Description

- Register a new user

#### Endpoint

    ``` POST /auth/signup```

#### Request Body

``` 
    {
        username: string,
        password: string,
        email: string
    }
``` 
#### Response

> Success Response
```
    status:200
```
``` 
    {
        "message": "User created",
        "token": "token String"
    }
```
> Error Response

User already exists
```
    status: 400
```
```
    {
        "message": "User already exists"
    }
```

Invalid input data
```
    status: 400
```
```
    {
        "message": "Invalid input data"
    }
```
### 2. Login

#### Description
- Login a user

#### Endpoint

    ``` POST /auth/login```

#### Request Body
    
    ``` 
        {
            username: string,
            password: string
        }
    ```
#### Response

> Success Response
```
    status:200
```
``` 
    {
        "message": "User logged in",
        "token": "token String"
    }
```
> Error Response

User already exists
```
    status: 400
```
```
    {
        "message": "Invalid credentials"
    }
```
Invalid input data(Username or password is incorrect)
```
    status: 400
```
```
    {
        "message": "Invalid input data"
    }
```
### 3. Generate AI notes 

#### Description
- generate summary , Action items and disclaimer for the thoughts entered by the user

#### Endpoint

    ``` POST /notes/createAI```
### Request Body
    
    ``` 
        {
            thoughts: string
            title: string
        }
    ```
#### Response
> Success Response

```
    status: 200
```
```
{
    "data": {
        "tone": [string],
        "summary": string,
        "actionable": [string],
        "disclaimer": string
    }
}
```

> Error Response
Unauthorized
```
    status: 401
```
```
    {
        "message": "Unauthorized"
    }
```
AI server out of service
```
    status: 500
```
```
    {
        "message": "could not generate Summary"
    }
```
    
### 4. Get all notes

#### Description
- Get all notes for a user based on month and year
- default month and year is current month and year

#### Endpoint

    ``` GET /notes/records```

#### Query Params

    ``` 
        {
            month: number,
            year: number
        }
    ```
#### Response

> Success Response
```
    status:200
```
``` 
{
    "message": "success",
    "data": [
        {
            "_id": string,
            "tone": [
                string
            ],
            "title": string,
            "thoughts": string,
            "disclaimer": string,
            "summary": string,
            "actionable":[string],
        }
    ]
}

```
> Error Response
``` 
    status: 500
```
```
    {
        "message": "error message"
    }
```
### 5. Update a note

#### Description
- Update a note for a user
- Each time update request hit count of request by user is increased by 1
  
#### Endpoint

    ``` POST /updateNote```

#### Request Body
    
    ``` 
        {
            id: string,
            title: string,
            thoughts: string,
        }
    ```
#### Response

> Success Response
```
    status:200
```
``` 
    {
        "message": "updated successfully",

    }
```

> Error Response
``` 
    status: 500
```
```
    {
        "message": "error message",
        "data": 
        {
            "tone": [string],
            "summary": string,
            "actionable": [string],
            "disclaimer": string
        }
    }
```