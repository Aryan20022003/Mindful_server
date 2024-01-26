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
    