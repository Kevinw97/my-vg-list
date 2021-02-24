# MyVGList

Small web app using the https://rawg.io/ API to browse video games.

## Functionality:
* Browse video games with API calls to RAWG

* Authenticate using Google Firebase

* Add video games to a personal list stored in Firestore 

* Update game properties such as playtime, status, and rating

## How to run:

### Create .env file with API keys for RAWG and Firebase and add to the root directory
```
REACT_APP_RAWG_API_KEY=
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### Run `npm start` in the root directory