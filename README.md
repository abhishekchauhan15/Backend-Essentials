# MathonGo
Postman Collection Link: https://www.getpostman.com/collections/85c6a2698361ecd67d74



<hr>

## MathonGO API Collection

Created API : [https://backend-mathongo.herokuapp.com](https://backend-mathongo.herokuapp.com/)

It contain the following requests :

*   SignUp
*   OTP Verification
*   SignIn
*   Forget Password
*   Reset Password
*   Logout




#  API - Schema


- /{{baseUrl}}

    - > /signup
    - > /verify
    - > /signin
    - > /forgotPassword
    - > /resetPassword
    - > /logout
 
<hr>

# ⚒️ Tech Stack
<img src="https://img.shields.io/badge/JavaScript-282C34?logo=javascript&logoColor=F7DF1E" alt="JavaScript logo" title="JavaScript" height="25" /><img src="https://img.shields.io/badge/MongoDB-282C34?logo=mongodb&logoColor=47A248" alt="MongoDB logo" title="MongoDB" height="25" /><img src="https://img.shields.io/badge/Node.js-282C34?logo=node.js&logoColor=339933" alt="Node.js logo" title="Node.js" height="25" /><img src="https://img.shields.io/badge/git-282C34?logo=git&logoColor=F05032" alt="git logo" title="git" height="25" /><img src="https://img.shields.io/badge/VS%20Code-282C34?logo=visual-studio-code&logoColor=007ACC" alt="Visual Studio Code logo" title="Visual Studio Code" height="25" /><img src="https://img.shields.io/badge/Express-282C34?logo=express&logoColor=FFFFFF" alt="Express.js logo" title="Express.js" height="25" />
<hr>

## Schema





Response (Example)


### `POST` 

`{{baseUrl}}/signup`

Request
```json
{
    "firstName": "abhi",
    "lastName": "chauhan",
    "email": "sample@gmail.com", 
    "password": "123asdas456"
} 
```

Response
```json 

{
    "status": "SUCCESS",
    "message": "OTP sent to your email",
    "data": {
        "userId": "6317586b1a048098e3860d76",
        "email": "k@gmail.com"
    }
}

```

<hr>
<br>

### OTP Verification 

### `POST`

`{{baseUrl}}/verify`

Request
```json 
{
    "userId": "63175bb71a048098e3860d82",
    "otp": "621198"
}
```


Response Example
```json 
{
    "message": "VERIFIED & User registered successfully"
}
```

<hr>

### `POST` 

`POST /signin`

Request


```json
{
    "email": "j@gmail.com", 
    "password": "123456"
}
```

Response
```json 
{
    "message": "User signed in successfully",
    "token": "eyJhbGciOiJIUzI1NiJ9.IjYzMTc1YmI3MWEwNDgwOThlMzg2MGQ4MiI.kSgrgRQQU3NV7GzflDZU0IQYtTH5RMWhronX9jtsBPE"
}

```

<hr>
<br>

### `POST` 

`POST /signup`

Request


```json
{
    "firstName": "abhi",
    "lastName": "chauhan",
    "email": "sample@gmail.com", 
    "password": "123asdas456"
} 
```

Response
```json 

{
    "status": "SUCCESS",
    "message": "OTP sent to your email",
    "data": {
        "userId": "6317586b1a048098e3860d76",
        "email": "k@gmail.com"
    }
}

```

<hr>
<br>

### `POST` 

`POST /forgotPassword`

Request


```json
{
    "email": "sdf@gmail.com"
}
```

Response
```json 
{
    "message": "OTP sent to your email",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NWJiNzFhMDQ4MDk4ZTM4NjBkODIiLCJpYXQiOjE2NjI0NzU3NTksImV4cCI6MTY2MjQ3NjA1OX0.5pMRwLSEWVqkThzfvEu9Pu5vOdB5Rd7zl0pROcCrpc0"
}

```

<hr>
<br>


### `POST` 

`{{baseUrl}}/resetPassword`

Request


```json
{
    "password":"asdfasdf",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE3NTIyNTFhMDQ4MDk4ZTM4NjBkNjgiLCJpYXQiOjE2NjI0NzMzMTcsImV4cCI6MTY2MjQ3MzYxN30.rNGNcjCl8jPDurOy1RsDEjURF1MiHXAFwMlLBow7sbc"
}
```

Response
```json 
{
    "message": "Password reset success"
}

```

<hr>
<br>


### `POST` 

`{{baseUrl}}/logout`

Request


```json
{
    "email":"a@gmail.com"
}
```

Response
```json 
{
    "message": "User logout",
}
```

<hr>
<br>


