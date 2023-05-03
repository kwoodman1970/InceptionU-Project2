import express from "express";
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken =
  "pk.eyJ1IjoibW90b2NsaWNrIiwiYSI6ImNsZ3NvbGJvazBsZW8zZXM4MGo2YzZrMWsifQ.EqLZAYFlhh58IuQ1UmJYUw";
import * as OpenApiValidator from "express-openapi-validator";
// import { validate } from "express-openapi-validator";
import pkg from "express-openapi-validator";
const { validate } = pkg;
import path from "path";
import dotenv from "dotenv";
dotenv.config();
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";
// Assertion is needed b/c it's importing a file type and not a module
import users from "./users.json" assert { type: "json" };
import activities from "./activities.json" assert { type: "json" };

// const users = JSON.parse(fs.readFileSync("./users.json"));
// const activities = JSON.parse(fs.readFileSync("./activities.json"));

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4200;

// This randomizes the port number
// const port = ~~(Math.random() * 65535);

// CORS for API requests.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // I'm a little worried about using the * wildcard here,
  // since it's been declared above while importing
  // from the OpenApiValidator library...
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

// This piece serves the OpenAPI spec
app.use("/spec", express.static(path.join("/openapi.yaml", "openapi.yaml")));

// This piece validates requests & responses against the OpenAPI spec
// But it doesn't actually work here... use the documentation version below!
// app.use(
//   validate({
//     apiSpec: path.join("/openapi.yaml", "openapi.yaml"),
//   })
// );

// This is from the documentation and so actually works!!
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  })
);

// This grabs activities associated with a specific user
app.get("/users/:id/activities", (req, res) => {
  const userId = req.params.id;
  const userActivities = activities.filter(
    (activity) => activity.userId === userId
  );

  res.json(userActivities);
});

// This adds a new activity for a user
app.post("/users/:id/activities", (req, res) => {
  // This reads existing user activities from file
  fs.readFile(`user-${req.params.id}-activities.json`, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading user's activity(ies) from file");
      return;
    }

    // This parses JSON data from file.
    const activities = JSON.parse(data);

    // This generate a unique ID for the new activity.
    const newActivityId = Date.now().toString();

    // This adds the new activity to the list of existing activities.
    const newActivity = {
      id: newActivityId,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
    };
    activities.push(newActivity);

    // This writes updated list of activities back to file in fs.
    fs.writeFile(
      `user-${req.params.id}-activities.json`,
      JSON.stringify(activities),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing user's activity to file");
        } else {
          res.send("Activity created successfully");
        }
      }
    );
  });
});

// This deletes an activity for a user
app.delete("/users/:id/activities/:activityId", (req, res) => {
  // This reads existing user activities from file
  fs.readFile(`user-${req.params.id}-activities.json`, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading user's activity(ies) from file");
      return;
    }

    // This parses JSON data from file.
    const activities = JSON.parse(data);

    // This removes the activity with the specified id from the list of existing activities.
    const activityIndex = activities.findIndex(
      (activity) => activity.id === req.params.activityId
    );
    if (activityIndex === -1) {
      res.status(404).send("Activity not found");
      return;
    }
    activities.splice(activityIndex, 1);

    // This writes updated list of activities back to file in fs.
    fs.writeFile(
      `user-${req.params.id}-activities.json`,
      JSON.stringify(activities),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing user's activity to file");
        } else {
          res.send("Activity deleted successfully");
        }
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
