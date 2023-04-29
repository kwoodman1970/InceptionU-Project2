import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
// The following import {validate} statement doesn't work, use the ABOVE from the documentation for the library!
// import { validate } from "express-openapi-validator";
import pkg from "express-openapi-validator";
const { validate } = pkg;
import path from "path";
import fetch from "node-fetch";

// @@@Not using this right now, b/c uudiv4@@@
// import { v4 as uuidv4 } from "uuid";

// @@@Not using fs module in the server.js, b/c not using app.post here anymore
// So... prolly no need to import the fs module here?
// Does this make the code more efficient, performance-wise?@@@
// import fs from "fs";

// Assertion is needed b/c it's importing a file type and not a module
import users from "./users.json" assert { type: "json" };
import friends from "./friends.json" assert { type: "json" };

const app = express();
app.use(express.json());

// CORS for API requests.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // I'm a little worried about using the * wildcard here,
  // since it's been declared above while importing
  // from the OpenApiValidator...
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

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

// @@@@Not using these right now, b/c uudiv4@@@
// const users = { users: [...usersData.users] };
// let friends = { friends: [...friendsData.friends] };

// This piece serves the OpenAPI spec
app.use("/spec", express.static(path.join("/openapi.yaml", "openapi.yaml")));

// This piece validates requests & responses against the OpenAPI spec
// app.use(
//   validate({
//     apiSpec: path.join("/openapi.yaml", "openapi.yaml"),
//   })
// );

// This piece also does the same???
// This is from the documentation and so actually works!!
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  })
);

// This is the error handler for the above block of code for OpenAPI
app.use((err, req, res, next) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

// This returns the entire (users) object
// Do I need all the users at once, tho?
app.get("/users", (req, res) => {
  res.json(users);
});

// @@@Not using this right now, b/c uuidv4@@@
// app.post("/users", (req, res) => {
//   const newUser = {
//     id: uuidv4(),
//     username: req.body.username,
//     password: req.body.password,
//   };

//   users.users.push(newUser);
//   res.status(201).json(newUser);
// });

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

app.listen(4200, () => console.log("Server started on port 4200"));
