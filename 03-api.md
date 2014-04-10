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
  createdAt: "2014-02-21T06:00:08.220Z",
  email: "user@email.com",
  id: "5306eb68def6573a07d7ba13",
  updatedAt: "2014-02-21T06:00:08.221Z",
  username: "user"
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
  createdAt: "2014-02-21T06:00:08.220Z",
  email: "user@email.com",
  id: "5306eb68def6573a07d7ba13",
  updatedAt: "2014-02-21T06:00:08.221Z",
  username: "user"
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
| game | id of the game to fetch lobbies from |

**Output:**

Success:  an array of Lobby models, each containing an array of User models

```js
[{
  createdAt: "2014-02-24T12:14:50.000Z",
  name: "Awesome Poker Lobby",
  game: "530b1f08f01ac484dc981c3d",
  id: "530b3d5cceacfc293ad9ce1f",
  maxNumPlayers: 10,
  minNumPlayers: 5,
  host: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z",
  status: 'waitingForPlayersToJoin'
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
data: a Lobby model without the Users or Messages array

event: "lobbyRemoved"  
data: id of the removed Lobby

event: "lobbyStatusChanged"  
data: a Lobby model without the Users or Messages array

**Notes:**

Must make the request using sockets to receive socket messages.

Additionally, the array of lobbies do not contain the list of users or the messages in that lobby. To receive that information, the user must first join the lobby. We plan to add user count information in the future.

--------------------------------------------------

## Unsubscribe from Game Lobbies

**Route:** _POST /game/unsubscribe_

**Connection Type:** Sockets only

**Input:**

| Keys | Values |
| ---- | ------ |
| game | id of the game to unsubscribe from |

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
| game | game id of the game to create a lobby for |
| name | string representing the user-given name for a lobby (does not have to be unique) |
| minNumPlayers | minimum number of players in the lobby before the game can start |
| maxNumPlayers | maximum number of players that can be in the lobby |

**Output:**

Success: a Lobby model, which contains an array of User models

```js
{
  createdAt: "2014-02-24T12:14:50.000Z",
  name: "Awesome Poker Lobby",
  game: "530b1f08f01ac484dc981c3d",
  id: "530b3d5cceacfc293ad9ce1f",
  maxNumPlayers: 10,
  minNumPlayers: 5,
  host: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z",
  status: 'waitingForPlayersToJoin',
  users: [{
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }, ...],
  messages: [{
    content: "Hello, World!",
    createdAt: "2014-02-24T12:14:50.000Z",
    id: "530b3d5cceacfc293ad9ce1f",
    from: "530b394026b8fd163957e8ae",
    updatedAt: "2014-02-24T12:38:52.885Z"
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

event: "hostChanged"  
data: id of the new host user

event: "newUserMessage"  
data: a Message model for a user-sent message (contains a User id in the "from" attribute)

event: "newSystemMessage"  
data: a Message model for a system-sent message (no "from" attribute)

**Notes:**

Must make the request using sockets to receive socket messages.

--------------------------------------------------

## Join Lobby

**Route:** _POST /lobby/join_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| lobby | id of the lobby to join |

**Output:**

Success: a Lobby model, which contains an array of User models

```js
{
  createdAt: "2014-02-24T12:14:50.000Z",
  name: "Awesome Poker Lobby",
  game: "530b1f08f01ac484dc981c3d",
  id: "530b3d5cceacfc293ad9ce1f",
  maxNumPlayers: 10,
  minNumPlayers: 5,
  host: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z",
  status: 'waitingForPlayersToJoin',
  users: [{
    createdAt: "2014-02-21T06:00:08.220Z",
    email: "user@email.com",
    id: "5306eb68def6573a07d7ba13",
    updatedAt: "2014-02-21T06:00:08.221Z",
    username: "user"
  }, ...],
  messages: [{
    content: "Hello, World!",
    createdAt: "2014-02-24T12:14:50.000Z",
    id: "530b3d5cceacfc293ad9ce1f",
    from: "530b394026b8fd163957e8ae",
    updatedAt: "2014-02-24T12:38:52.885Z"
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

event: "hostChanged"  
data: id of the new host user

event: "newUserMessage"  
data: a Message model for a user-sent message (contains a User id in the "from" attribute)

event: "newSystemMessage"  
data: a Message model for a system-sent message (no "from" attribute)

**Notes:**

Must make the request using sockets to receive socket messages.

--------------------------------------------------

## Leave Lobby

**Route:** _POST /lobby/leave_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| lobby | id of the lobby to leave |

**Output:**

Success: the id of the Lobby removed

```js
"530b3d5cceacfc293ad9ce1f"
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

## Post Message

**Route:** _POST /lobby/postMessage_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| lobby | id of the lobby to leave |
| content | message text |

**Output:**

Success: a Message model

```js
{
  content: "Hello, World!",
  createdAt: "2014-02-24T12:14:50.000Z",
  id: "530b3d5cceacfc293ad9ce1f",
  from: "530b394026b8fd163957e8ae",
  updatedAt: "2014-02-24T12:38:52.885Z"
}
```

Error:

```js
{
  status: "error",
  message: "Error message here." 
}
```

--------------------------------------------------

## Start Match

**Route:** _POST /match/startMatch_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| lobby | id of the lobby to start a match for |

**Output:**

Success: the id of the started match and the value of the dirty integer for the commonState

```js
{
  id: "530b3d5cceacfc293ad9ce1f",
  dirty: 0
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

on: "match"  
verb: "messaged"

event: "matchStarted"  
data: an object containing the id of the started match and the current dirty integer for the commonState
```js
{
  id: "530b3d5cceacfc293ad9ce1f",
  dirty: 0 
}
```

**Notes:**

While a Match model exists on the server, the client will not receive this information. The important models for the client are the Lobby, CommonState, PlayerState, and Event models (the Match model just connects all these). However, the client will need to track the match id for use later when calling methods on the Match controller.

--------------------------------------------------

## Update Common State

**Route:** _POST /match/updateCommonState_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| match | id of the match to update |
| dirty | lasty dirty integer from the common state |
| state | JSON representing the new common state |

**Output:**

Success: a 'commonStateUpdated' Event model

```js
{
  match: '5345fa077113aaf81dbf6296',
  event: 'commonStateUpdated',
  issuedBy: '5345fa067113aaf81dbf6256',
  data: {
    state: 'TEST',
    dirty: 1
  },
  createdAt: '2014-04-10T01:55:19.908Z',
  updatedAt: '2014-04-10T01:55:19.908Z',
  id: '5345fa077113aaf81dbf629b'
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

on: "match"  
verb: "messaged"

event: "commonStateUpdated"  
data: a 'commonStateUpdated' Event model (see 'Success' output above)

**Notes:**

Most events have an "issuedTo" field, but since the 'commonStateUpdated' event is sent to everyone, that field does not exist.

Additionally, only a player that has control of the match lock can update the common state. To transfer ownership of the lock, use a 'turnover' event.

--------------------------------------------------

## Update Player State

**Route:** _POST /match/updatePLayerState_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| match | id of the match to update |
| state | JSON representing the new common state |

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

There are no socket messages. The state for any player is restricted in that only that player has access to it.

**Notes:**

The player state should contain any information that only a certain player should have access to. It will not be directly accessible by other users. By calling this endpoint, you are more or less just persisting the player state to the server (useful if the player quits playing for awhile or switches devices).

--------------------------------------------------

## Send Broadcast Event

**Route:** _POST /match/sendBroadcastEvent_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| match | id of the match to update |
| payload | JSON representing the data to send |
| issuedTo | array of user ids to send the message to (optional - if not included or an empty array, will send to everyone) |

**Output:**

Success: a 'broadcast' Event model

```js
{
  match: '5345fe411c4ce5f81f0a9d37',
  event: 'broadcast',
  issuedBy: '5345fe3c1c4ce5f81f0a9c64',
  data: ...,
  createdAt: '2014-04-10T02:13:21.048Z',
  updatedAt: '2014-04-10T02:13:21.048Z',
  id: '5345fe411c4ce5f81f0a9d3c'
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

on: "match"  
verb: "messaged"

event: "broadcast"  
data: a 'broadcast' Event model (see 'Success' output above)

**Notes:**

Use this endpoint to message users with some data.

--------------------------------------------------

## Send Request Event

**Route:** _POST /match/sendRequestEvent_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| match | id of the match to update |
| payload | JSON representing the data to send |
| issuedTo | array of user ids to send the message to (optional - if not included or an empty array, will send to everyone) |

**Output:**

Success: a 'request' Event model

```js
{
  match: '534601d7f3f06efa21eb61e8',
  event: 'request',
  issuedBy: '534601d0f3f06efa21eb60db',
  data: ...,
  createdAt: '2014-04-10T02:28:39.315Z',
  updatedAt: '2014-04-10T02:28:39.315Z',
  id: '534601d7f3f06efa21eb61ed'
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

on: "match"  
verb: "messaged"

event: "request"  
data: a 'request' Event model (see 'Success' output above)

**Notes:**

Use this endpoint to message users with some data, and you expect those users to respond with a 'respond' event at some point in the future.

--------------------------------------------------

## Send Response Event

**Route:** _POST /match/sendResponseEvent_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| event | id of the 'response' event you are responding to (note: must be a 'response' event, not any other kind of event) |
| payload | JSON representing the data to send |

**Output:**

Success: a 'response' Event model

```js
{
  match: '534602ae2028d5372264d22b',
  event: 'response',
  issuedBy: '534602a62028d5372264d0e6',
  data: ...,
  createdAt: '2014-04-10T02:32:14.964Z',
  updatedAt: '2014-04-10T02:32:14.964Z',
  id: '534602ae2028d5372264d232'
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

on: "match"  
verb: "messaged"

event: "response"  
data: a 'response' Event model (see 'Success' output above)

**Notes:**

Use this endpoint to respond with some data to a 'request' event.

--------------------------------------------------

## Send Turnover Event

**Route:** _POST /match/sendTurnoverEvent_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| match | id of the match to update |
| payload | JSON representing the data to send |
| issuedTo | user id of whomever should receive control of the match lock next (as a string or as an array containing one string) |

**Output:**

Success: a 'turnover' Event model

```js
{
  match: '534603341683f26722f40437',
  event: 'turnover',
  issuedBy: '5346032a1683f26722f402bd',
  data: ...,
  createdAt: '2014-04-10T02:34:28.641Z',
  updatedAt: '2014-04-10T02:34:28.641Z',
  id: '534603341683f26722f4043c'
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

on: "match"  
verb: "messaged"

event: "turnover"  
data: a 'turnover' Event model (see 'Success' output above)

**Notes:**

This endpoint is used to give the match lock to another player. Since only the player in control of the match lock can update the common state, this endpoint is useful for signifying the end of one player's turn and the start of another's turn.

--------------------------------------------------

## End Match

**Route:** _POST /match/endMatch_

**Connection Type:** HTTP Request or Sockets

**Input:**

| Keys | Values |
| ---- | ------ |
| match | id of the match to update |
| payload | JSON representing the data to send |

**Output:**

Success: an 'endMatch' Event model

```js
{
  match: '534604855fbe3dc62237d9b9',
  event: 'endMatch',
  issuedBy: '534604785fbe3dc62237d7e2',
  data: ...,
  createdAt: '2014-04-10T02:40:05.249Z',
  updatedAt: '2014-04-10T02:40:05.249Z',
  id: '534604855fbe3dc62237d9be'
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

on: "match"  
verb: "messaged"

event: "endMatch"  
data: an 'endMatch' Event model (see 'Success' output above)

**Notes:**

Use this endpoint to message everyone about the end of the match. Note that this endpoint automatically messages everyone (i.e. there is no issuedTo parameter).
