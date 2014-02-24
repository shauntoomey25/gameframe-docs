---
layout: default
title: Models | Game Frame
navlink: Models
group: navigation
permalink: "models.html"
---

Notes: Our models are still rapidly evolving. The attributes listed below are the most stable ones (i.e. they probably won't change). Models may gain more attributes as needed.

--------------------------------------------------

## User

| Keys | Description |
| ---- | ------ |
| id | the user's unique user id |
| username | the user's unique name |
| email | the user's email address |

--------------------------------------------------

## Game

| Keys | Description |
| ---- | ------ |
| id | the unique game id |
| title | the game's title |
| developer | the game's developer |

--------------------------------------------------

## Lobby

| Keys | Description |
| ---- | ------ |
| id | the unique lobby id |
| game | id of the game represented by the lobby |
| owner | id of the user who created the lobby |
| minNumPlayers | integer representing the minimum number of players allowed in the lobby |
| maxNumPlayers | integer representing the maximum number of players allowed in the lobby |
| users | an array of User models representing the current users in the lobby |
