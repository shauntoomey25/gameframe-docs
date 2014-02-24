---
layout: default
title: Server API | Game Frame
navlink: Server API
group: navigation
permalink: "api.html"
---

## User Registration

**Route:** _POST /auth/local/register_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| username | the user's unique name |
| email | the user's email address |
| password | the user's password |

**Output:**

Success:

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

Error:

```js
{
  status: "error",
  message: "Password must be at least 8 characters long." 
}
```

--------------------------------------------------

## User Login

**Route:** _POST /auth/local/login_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| identifier | the user's username OR email address |
| password | the user's password |

**Output:**

Success: a User model

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

Error:

```js
{
  status: "error",
  message: "Incorrect password." 
}
```

--------------------------------------------------

## User Logout

**Route:** _GET /auth/local/logout_

**Connection Type:** HTTP Request or Sockets

**Input:** None

**Output:**

Success:

```js
{
  status: "success",
  message: null 
}
```

**Notes:**

There are currently no error messages for logging out. The 'success' message guarantees that the current user is logged out (does not matter whether the current user was currently logged in or not when the logout request was made).

--------------------------------------------------

## Fetch Games

**Route:** _GET /game_

**Connection Type:** HTTP Request or Sockets

**Input:** None

**Output:**

Success:  an array of Game models

```js
[{
  id: "530b1f08f01ac484dc981c3d",
  title: "com.gameframe.poker",
  developer: "Game Frame Studios"
}, ... ]
```

Error

```js
{
  status: "error",
  message: "Error message here." 
}
```

--------------------------------------------------

## Fetch Lobbies

**Route:** _POST /game/fetchLobbies_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| id | id of the game to fetch lobbies from |

**Output:**

Success:  an array of Lobby models, each containing an array of User models

```js
[{
  createdAt: "2014-02-24T12:14:50.000Z",
  game: "530b1f08f01ac484dc981c3d",
  id: "530b3d5cceacfc293ad9ce1f",
  maxNumPlayers: 10,
  minNumPlayers: 5,
  owner: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z",
  users: [{
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }, ...]
}, ... ]
```

Error

```js
{
  status: "error",
  message: "Error message here." 
}
```

**Socket Messages:**

on: "game"
verb: "messaged"

event: "lobbyAdded"
data: a Lobby model, which contains an array of User models

event: "lobbyRemoved"
data: id of the removed Lobby

**Notes:**

Must make the request using sockets to receive socket messages.

--------------------------------------------------

## Unsubscribe from Game Lobbies

**Route:** _POST /game/unsubscribe_

**Connection Type:** Sockets only

**Input:**

| Keys | Values |
| ---- | ------ |
| id | id of the game to unsubscribe from |

**Output:**

Success:

```js
{
  status: "success",
  message: null
}
```

Error:

```js
{
  status: "error",
  message: "Error message here." 
}
```

**Socket Messages:**

No longer receive the "lobbyAdded" or "lobbyRemoved" events while listening on "game" with verb "messaged".

--------------------------------------------------

## Create Lobby

**Route:** _POST /lobby/create_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| id | id of the game to create a lobby for |
| minNumPlayers | minimum number of players in the lobby before the game can start |
| maxNumPlayers | maximum number of players that can be in the lobby |

**Output:**

Success: a Lobby model, which contains an array of User models

```js
{
  createdAt: "2014-02-24T12:14:50.000Z",
  game: "530b1f08f01ac484dc981c3d",
  id: "530b3d5cceacfc293ad9ce1f",
  maxNumPlayers: 10,
  minNumPlayers: 5,
  owner: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z",
  users: [{
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }, ...]
}
```

Error:

```js
{
  status: "error",
  message: "Error message here." 
}
```

**Socket Messages:**

on: "lobby"
verb: "messaged"

event: "userAdded"
data: a User model for the newly-joined user

event: "userRemoved"
data: id of the removed user

**Notes:**

Must make the request using sockets to receive socket messages.

--------------------------------------------------

## Join Lobby

**Route:** _POST /lobby/join_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| id | id of the lobby to join |

**Output:**

Success: a Lobby model, which contains an array of User models

```js
{
  createdAt: "2014-02-24T12:14:50.000Z",
  game: "530b1f08f01ac484dc981c3d",
  id: "530b3d5cceacfc293ad9ce1f",
  maxNumPlayers: 10,
  minNumPlayers: 5,
  owner: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z",
  users: [{
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }, ...]
}
```

Error:

```js
{
  status: "error",
  message: "Error message here." 
}
```

**Socket Messages:**

on: "lobby"
verb: "messaged"

event: "userAdded"
data: a User model for the newly-joined user

event: "userRemoved"
data: id of the removed user

**Notes:**

Must make the request using sockets to receive socket messages.

--------------------------------------------------

## Leave Lobby

**Route:** _POST /lobby/leave_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| id | id of the lobby to leave |

**Output:**

Success: a Lobby model, which contains an array of User models

```js
{
  createdAt: "2014-02-24T12:14:50.000Z",
  game: "530b1f08f01ac484dc981c3d",
  id: "530b3d5cceacfc293ad9ce1f",
  maxNumPlayers: 10,
  minNumPlayers: 5,
  owner: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z",
  users: [{
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }, ...]
}
```

Error:

```js
{
  status: "error",
  message: "Error message here." 
}
```

**Socket Messages:**

No longer receive the "lobbyAdded" or "lobbyRemoved" events while listening on "game" with verb "messaged".
