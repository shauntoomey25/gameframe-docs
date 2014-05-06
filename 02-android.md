---
layout: default
title: Android SDK | Game Frame
navlink: Android SDK
group: navigation
permalink: "android.html"
---

## Login

**Method:** AuthenticationManager.login()

**Parameters:** String identifier, String password

**Events:** UserLoginEvent

**Action:** Log in the user on the server.

--------------------------------------------------

## Register

**Method:** AuthenticationManager.register()

**Parameters:** String username, String emailAddress, String password

**Events:** UserRegisterEvent

**Action:** Register a new user on the server.

--------------------------------------------------

## Logout

**Method:** AuthenticationManager.logout()

**Parameters:** None

**Events:** UserLogoutEvent

**Action:** Logout the local user on the server.

--------------------------------------------------

## Fetch Lobby List

**Method:** LobbyListManager.fetchLobbyList()

**Parameters:** None

**Events:** LobbyListEvent, LobbyAddEvent, LobbyRemoveEvent

**Action:** Fetches the current list of active lobbies and subscribes the application to receive notices of lobbies that are added or deleted from the list.

--------------------------------------------------

## Unsubscribe From Lobby List

**Method:** LobbyListManager.unsubscribe()

**Parameters:** None

**Events:** None

**Action:** Cancels the application's subscription to receive notices of lobbies that are added or deleted from the list.

--------------------------------------------------

## Join Lobby

**Method:** LobbyManager.joinLobby()

**Parameters:** String lobbyID

**Events:** LobbyJoinEvent, UserAddEvent, UserRemoveEvent, NewMessageEvent

**Action:** Join the local player to the lobby specified and subscribes the application to receive notifications of users added to or removed from that lobby, as well as chat messages.

--------------------------------------------------

## Create Lobby

**Method:** LobbyManager.createLobby()

**Parameters:** String lobbyName, int minNumPlayers, int maxNumPlayers

**Events:** LobbyCreateEvent

**Action:** Attempts to create a new lobby with the parameters given.

--------------------------------------------------

## Send Chat Message

**Method:** LobbyManager.sendMessage()

**Parameters:** String lobbyID, String message

**Events:** NewMessageEvent

**Action:** Attempts to send a new chat messages to all players in the lobby.

--------------------------------------------------

## Leave Lobby

**Method:** LobbyManager.leaveLobby()

**Parameters:** String lobbyID

**Events:** LobbyLeaveEvent

**Action:** Remove the user from the given lobby, as well as unsubscribe the application from user and chat modifications in that lobby.

--------------------------------------------------

## Start Match

**Method:** LobbyManager.startMatch()

**Parameters:** String lobbyID

**Events:** MatchStartedEvent

**Action:** Start the match of the given lobby, notifying all player that the match has  begun.

--------------------------------------------------

## Update Common State

**Method:** MatchManager.updateCommonState()

**Parameters:** String matchID, int dirty, String stateJson

**Events:** UpdateCommonStateEvent

**Action:** Update the common state on the server to the supplied JSON object and notify all players of the change.

--------------------------------------------------

## Update Player State

**Method:** MatchManager.updateCommonState()

**Parameters:** String matchID, String stateJson

**Events:** None

**Action:** Update the player state on the server to the supplied JSON object.

--------------------------------------------------

## Send Broadcast

**Method:** MatchManager.sendBroadcast()

**Parameters:** String matchID, String payloadJson, String[] playerIDs

**Events:** BroadcastEvent

**Action:** Send a broadcast message and JSON payload to the given players. If no player IDs are included, all players will receive the message.

--------------------------------------------------

## Send Request

**Method:** MatchManager.sendRequest()

**Parameters:** String matchID, String payloadJson, String[] playerIDs

**Events:** RequestEvent

**Action:** Send a request message and JSON payload to the given players. If no player IDs are included, all players will receive the message.

--------------------------------------------------

## Send Response

**Method:** MatchManager.sendResponse()

**Parameters:** String requestID, String payloadJson

**Events:** ResponseEvent

**Action:** Send a response message in reply to the request whose ID is supplied.

--------------------------------------------------

## Send Turn Over

**Method:** MatchManager.turnover()

**Parameters:** String matchID, String payloadJson, String turnoverTo

**Events:** TurnoverEvent

**Action:** Send a turnover message and JSON payload to all players, putting the given player in the lock.

--------------------------------------------------

## Send End Match

**Method:** MatchManager.endMatch()

**Parameters:** String matchID, String payloadJson

**Events:** MatchEndEvent

**Action:** Tells all players that the match has ended.
