---
layout: default
title: Models | Game Frame
navlink: Models
group: navigation
permalink: "models.html"
---

Notes: Our models are still rapidly evolving. The attributes listed below are the most stable ones (i.e. they probably won't change). Models may gain more attributes as needed. Additionally

--------------------------------------------------

## User

| Keys | Description |
| ---- | ------ |
| id | the user's unique user id |
| username | the user's unique name |
| email | the user's email address |
| createdAt | when the User was created |
| updatedAt | when the User was last updated |

--------------------------------------------------

## Game

| Keys | Description |
| ---- | ------ |
| id | the unique game id |
| title | the game's title |
| developer | the game's developer |
| createdAt | when the Game was created |
| updatedAt | when the Game was last updated |

--------------------------------------------------

## Lobby

| Keys | Description |
| ---- | ------ |
| id | the unique lobby id |
| name | the user-given name for a lobby (does not have to be unique) |
| game | id of the game represented by the lobby |
| host | id of the user who created the lobby |
| minNumPlayers | integer representing the minimum number of players allowed in the lobby |
| maxNumPlayers | integer representing the maximum number of players allowed in the lobby |
| status | either 'waitingForPlayersToJoin', 'waitingForMatchToStart', or 'inMatch' |
| users | an array of User models representing the current users in the lobby |
| createdAt | when the Lobby was created |
| updatedAt | when the Lobby was last updated |

--------------------------------------------------

## Message

| Keys | Description |
| ---- | ------ |
| id | the unique message id |
| lobby | the unique lobby id associated with the message |
| content | the text of the message |
| from | user id of the sender of the message (undefined if it is a system message) |
| createdAt | when the Message was created |
| updatedAt | when the Message was last updated |

--------------------------------------------------

## Match

| Keys | Description |
| ---- | ------ |
| id | the unique match id |
| lobby | the unique lobby id associated with the match |
| content | the text of the message |
| commonState | the unique common state id associated with the match |
| playerStates | an array of player state ids associated with the match |
| createdAt | when the Message was created |
| updatedAt | when the Message was last updated |

--------------------------------------------------

## Common State

| Keys | Description |
| ---- | ------ |
| id | the unique common state id |
| match | the unique match id associated with the common state |
| dirty | an integer incremented whenever the common state is updated |
| state | JSON value representing the actual client-defined common state |
| createdAt | when the Message was created |
| updatedAt | when the Message was last updated |

**Notes**:

A player can only update the Common State if their user ID is in the match's lock attribute and they provide the last value of the common state's "dirty" attribute.

--------------------------------------------------

## Player State

| Keys | Description |
| ---- | ------ |
| id | the unique player state id |
| match | the unique match id associated with this player state |
| user | the unique user id associated with this player state |
| dirty | an integer incremented whenever this player state is updated |
| state | JSON value representing the actual client-defined player state |
| createdAt | when the Message was created |
| updatedAt | when the Message was last updated |

**Notes**:

A player can only update their own Player State, and no other players will have direct access to their Player State. The player must also provide the last value of their player state's "dirty" attribute.
