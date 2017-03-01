# Autopilot API

This is a simple Autopilot Node API that displays users and allows additional users to to be added to the system.

To setup simply clone the repo and run:
```
npm i
```
To start the server run:
```
npm run start
```
To test while the app is running run:
```
npm test
```
To run the linter run:
```
npm run lint
```
I went with a read/write JSON file approach for the application as I was struggling to find a way to export a local Mongo server without exposing private keys.

All GET/POST methods were tested real time using Postman.

This was the first time running tests on Node/Express and was an awesome learning experience!
