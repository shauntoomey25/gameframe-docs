---
layout: default
title: Server API | Game Frame
navlink: Server API
group: navigation
permalink: "api.html"
---

## User Registration

**Route:** _POST /auth/local/register_

**Input:**

| Keys | Values |
| ---- | ------ |
| username | the user's unique name |
| email | the user's email address |
| password | the user's password |

**Output:**

Success

```js
{
  status: "success",
  message: null .
  user: {
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }
}
```

Error

```js
{
  status: "error",
  message: "Password must be at least 8 characters long." 
}
```

## User Login

**Route:** _POST /auth/local/login_

**Input:**

| Keys | Values |
| ---- | ------ |
| identifier | the user's username OR email address |
| password | the user's password |

**Output:**

Success

```js
{
  status: "success",
  message: null,
  user: {
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }
}
```

Error

```js
{
  status: "error",
  message: "Incorrect password." 
}
```

## User Logout

**Route:** _GET /auth/local/logout_

**Input:** None

**Output:**

Success

```js
{
  status: "success",
  message: null 
}
```

**Notes:**

There are currently no error messages for logging out. The 'success' message guarantees that the current user is logged out (does not matter whether the current user was currently logged in or not when the logout request was made).
