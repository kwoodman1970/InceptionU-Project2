import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import * as OpenApiValidator from "express-openapi-validator";
// The following import {validate} statement BELOW doesn't work,
// use the ABOVE from the documentation for the library!
// import { validate } from "express-openapi-validator";
// import pkg from "express-openapi-validator";
// const { validate } = pkg;
// import path from "path";
// import fetch from "node-fetch";

// @@@Not using this right now, b/c uudiv4@@@
// import { v4 as uuidv4 } from "uuid";

// @@@Not using fs module in the server.js, b/c not using app.post here anymore
// So... prolly no need to import the fs module here?
// Does this make the code more efficient, performance-wise?@@@
// import fs from "fs";

// Assertion is needed b/c it's importing a file type and not a module
import users from "./users.json" assert { type: "json" };
import activities from "./activities.json" assert { type: "json" };
import { userInfo } from "os";

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());

// This randomizes the port number
// const port = ~~(Math.random() * 65535);

// CORS for API requests.
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   // I'm a little worried about using the * wildcard here,
//   // since it's been declared above while importing
//   // from the OpenApiValidator library...
//   res.setHeader("Access-Control-Allow-Methods", "GET");
//   next();
// });

// @@@@Not using these right now, b/c uudiv4@@@
// const users = { users: [...usersData.users] };
// let friends = { friends: [...friendsData.friends] };

// This piece serves the OpenAPI spec
// app.use("/spec", express.static(path.join("../openapi.yaml", "openapi.yaml")));

// This piece validates requests & responses against the OpenAPI spec
// app.use(
//   validate({
//     apiSpec: path.join("/openapi.yaml", "openapi.yaml"),
//   })
// );

// This piece also does the same???
// This is from the documentation and so actually works!!
// app.use(
//   OpenApiValidator.middleware({
//     apiSpec: "../openapi.yaml",
//     validateRequests: true, // (default)
//     validateResponses: true, // false by default
//   })
// );

// This is the error handler for the above block of code for OpenAPI
// app.use((err, req, res, next) => {
//   // format error
//   res.status(err.status || 500).json({
//     msg: err.message,
//     errors: err.errors,
//   });
// });

// This grabs the Trails API from City of Calgary
app.get("/data", async (req, res) => {
  try {
    const response = await fetch(
      "https://data.calgary.ca/resource/tfmd-grpe.json"
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from API");
  }
});

// This returns the entire (users) object
// Do I need all the users at once, tho?
app.get("/users", (req, res) => {
  res.json(users);
});

// This logs a user in.
app.get("/user", (req, res) => {
  const name = req.query.name;
  const password = req.query.password;

  if (name == password) {
    let userInfo = users.find(element => element.name == name);

    if (userInfo != null) {
      userInfo = JSON.parse(JSON.stringify(userInfo));

      userInfo.friendsList.forEach(function(element, index, array) {
        array[index] = {name:  users[element].name}
      });

      userInfo.createdActivities.forEach(function(element, index, array) {
        array[index] = activities[element]
      });

      userInfo.joinedActivities.forEach(function(element, index, array) {
        array[index] = activities[element]
      });

      res.send(userInfo);
    } else {
      res.status(404);
      res.send({msg:  "Invalid credentials"});
    }
  } else {
    res.status(404);
    res.send({msg:  "Invalid credentials"});
  }
});

// This registers a new user.
app.post("/user", (req, res) => {
  const newUser = req.body.userInfo;
  const password = req.body.password;

  if (newUser.name == password) {
    const userInfo = users.find(element => element.name == newUser.name);

    if (userInfo == null) {
      newUser.userUID = users.length;
      newUser.createdActivities = [];
      newUser.joinedActivities = [];
      newUser.friendsList = [];
      newUser.reviews = [];

      users.push(newUser);
      res.send({userUID:  newUser.userUID});
    } else {
      res.status(403);
      res.send({msg:  "User exists -- please log in or choose a different name"});
    }
  } else {
    res.status(403);
    res.send({msg:  "Invalid credentials"});
  }
});

app.get("/users/:id/friends", (req, res) => {
  const userId = req.params.id;
  const friends = friends.friends.filter((friend) => friend.userId === userId);

  res.json(friends);
});

// @@@Not using this right now, b/c uuidv4@@@
// app.post("/users/:id/friends", (req, res) => {
//   const userId = req.params.id;
//   const newFriend = {
//     id: uuidv4(),
//     userId: userId,
//     friendId: req.body.friendId,
//   };

//   friends.friends.push(newFriend);
//   res.status(201).json(newFriend);
// });

app.listen(port, () => console.log(`Server started on port ${port}`));
