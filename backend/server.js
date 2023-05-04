import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
// import * as OpenApiValidator from "express-openapi-validator";
// The following import {validate} statement BELOW doesn't work,
// use the ABOVE from the documentation for the library!
// import { validate } from "express-openapi-validator";
import pkg from "express-openapi-validator";
const { validate } = pkg;
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import pkg2 from "express-jwt";
const { expressjwt, ExpressJwtRequest } = pkg2;
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

// @@@Not using this right now, b/c uudiv4@@@
// import { v4 as uuidv4 } from "uuid";

// Assertion is needed b/c it's importing a file type and not a module
import users from "./users.json" assert { type: "json" };
import activities from "./activities.json" assert { type: "json" };
import { userInfo } from "os";

const app = express();
const PORT = process.env.PORT || 4201;
app.use(express.json());
app.use(cors());

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-122.4194, 37.7749],
  zoom: 12,
});

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

// This defines a route for the OpenAPI spec
// Also, it uses the swagger-ui-express library to generate a webpage
// that displays the OpenAPI spec at the /docs endpoint
// const swaggerDocument = YAML.load("../openapi.yaml");
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

// This logs a user in
app.get("/login", (req, res) => {
  const name = req.query.name;
  const password = req.query.password;

  if (name == password) {
    let userInfo = users.find((element) => element.name == name);

    if (userInfo != null) {
      userInfo = JSON.parse(JSON.stringify(userInfo));

      userInfo.friendsList.forEach(function (element, index, array) {
        array[index] = { name: users[element].name };
      });

      userInfo.createdActivities.forEach(function (element, index, array) {
        array[index] = activities[element];
      });

      userInfo.joinedActivities.forEach(function (element, index, array) {
        array[index] = activities[element];
      });

      res.send(userInfo);
    } else {
      res.status(404);
      res.send({ msg: "Invalid credentials" });
    }
  } else {
    res.status(404);
    res.send({ msg: "Invalid credentials" });
  }
});

// This registers a new user.
app.post("/user", (req, res) => {
  const newUser = req.body.userInfo;
  const password = req.body.password;

  if (newUser.name == password) {
    const userInfo = users.find((element) => element.name == newUser.name);

    if (userInfo == null) {
      newUser.userUID = users.length;
      newUser.createdActivities = [];
      newUser.joinedActivities = [];
      newUser.friendsList = [];
      newUser.reviews = [];

      users.push(newUser);
      res.send({ userUID: newUser.userUID });
    } else {
      res.status(403);
      res.send({
        msg: "User exists -- please log in or choose a different name",
      });
    }
  } else {
    res.status(403);
    res.send({ msg: "Invalid credentials" });
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

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
