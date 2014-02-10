---
layout: default
title: Server API | Game Frame
navlink: Server API
group: navigation
permalink: "api.html"
---

## Authentication Tokens

**Route:** _GET /csrfToken_

**Input:** None

**Output:**

```js
{
  "_csrf": "5T0pzcHqfyC8b403okqnZDdtIfA10VEBOx64U=" 
}
```

**Notes:**

Before doing anything else with the Game Frame server API, the client must request a CSRF (cross-site request forgery) token. This is a safety measure to protect our users from malicious websites. Every request sent to the server that modifies the state of the server (i.e. POST, PUT, DELETE, etc. requests) requires that this CSRF token also be sent. There are two methods of including the CSRF token:

1. Include the token as a POST parameter titled "_csrf" (same format as the output above).
2. Include the token as a request header titled "X-CSRF-Token".

In the other API calls on this page, the CSRF token is included as a parameter as a reminder of its necessity, but remember that it can be sent as a header alternatively. For more information, see [here](http://sailsjs.org/#!documentation/config.csrf).

## User Registration

**Route:** _POST /auth/local/register_

**Input:**

| Keys | Values |
| ---- | ------ |
| username | the user's unique name |
| email | the user's email address |
| password | the user's password |
| _csrf | authentication token (see Authentication Tokens section |

**Output:**

Success

```js
{
  status: "success",
  message: null 
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

**Route:** _POST /auth/local_

**Input:**

| Keys | Values |
| ---- | ------ |
| username | the user's unique name OR the user's email address |
| password | the user's password |
| _csrf | authentication token (see Authentication Tokens section |

**Output:**

Success

```js
{
  status: "success",
  message: null 
}
```

Error

```js
{
  status: "error",
  message: "Incorrect login information." 
}
```
