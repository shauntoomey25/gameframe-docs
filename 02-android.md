---
layout: default
title: Android SDK | Game Frame
navlink: Android SDK
group: navigation
permalink: "android.html"
---

## Login

**Method:** AuthenticationHelper.login()

**Parameters:** String identifier, String password

**Return:** None

**Action:** Attempts to log in the user on a background thread. If the AuthenticationHelper instance has had its success listener set using the AuthenticationHelper.setSuccessListener() method, the appropriate method will be call upon success or failure.

## Register

**Method:** AuthenticationHelper.register()

**Parameters:** String username, String emailAddress, String password

**Return:** None

**Action:** Attempts to register a new user on a background thread. If the AuthenticationHelper instance has had its success listener set using the AuthenticationHelper.setSuccessListener() method, the appropriate method will be call upon success or failure. If successful, the user will be logged in- no additional login is required.

## Show Default Error Messages

**Method:** PreferenceManager.setShowDefaultErrorMessages()

**Parameters:** None

**Return:** None

**Action:** If set to true, default error messages for web calls will be displayed before any onFailure() method is called.

## Set Server URL

**Method:** PreferenceManager.setServerURL()

**Parameters:** String serverURL

**Return:** None

**Action:** Allows the base URL of all web calls to be set programmactically. Defaults to "http://gameframe.dyndns.org".