import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import mapboxgl from "mapbox-gl";
mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;
import * as OpenApiValidator from "express-openapi-validator";
// import { validate } from "express-openapi-validator";
import pkg from "express-openapi-validator";
const { validate } = pkg;
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";
// import { expressjwt, ExpressJwtRequest } from "express-jwt";
import pkg2 from 'express-jwt';
const { expressjwt, ExpressJwtRequest } = pkg2;
// Assertion is needed b/c it's importing a file type and not a module
import users from "./users.json" assert { type: "json" };
import activities from "./activities.json" assert { type: "json" };

// const users = JSON.parse(fs.readFileSync("./users.json"));
// const activities = JSON.parse(fs.readFileSync("./activities.json"));

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 4201;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-122.4194, 37.7749],
  zoom: 12,
});

// This randomizes the port number
// const port = ~~(Math.random() * 65535);

// CORS for API requests.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

// This piece serves the OpenAPI spec
app.use("/spec", express.static(path.join("/openapi.yaml", "openapi.yaml")));

// This defines a route for the OpenAPI spec
// Also, it uses the swagger-ui-express library to generate a webpage
// that displays the OpenAPI spec at the /docs endpoint
const swaggerDocument = YAML.load("../openapi.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// This piece validates requests & responses against the OpenAPI spec
// (syntax is directly from the documentation)
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
 

    // This adds the MapBox map to the response object
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>MapBox Map</title>
          <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
          <script src="https://api.mapbox.com/mapbox-gl-js/v4/mapbox-gl.js"></script>
          <link href="https://api.mapbox.com/mapbox-gl-js/v4/mapbox-gl.css" rel="stylesheet" />
          <style>
            body {
              margin: 0;
              padding: 0;
            }
            #map {
              position: absolute;
              top: 0;
              bottom: 0;
              width: 100%;
            }
          </style>
        </head>
        <body>
          <div id="map"></div>
          <script>
            // This creates the MapBox map
            mapboxgl.accessToken 
            // = process.env.MAPBOX_ACCESS_TOKEN
            // How I format for access token while making it 
            // not visible to the public??
            const map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [-96, 37.8],
              zoom: 3,
            });
  
            // This adds markers for each user activity
            ${userActivities
              .map(
                (activity) => `
                new mapboxgl.Marker().setLngLat([${activity.longitude}, ${activity.latitude}]).addTo(map);
              `
              )
              .join("")}
          </script>
        </body>
      </html>
    `);
  });

// This adds a new activity for a user
app.post("/users/:id/activities", (req, res) => {
  const userId = req.params.id;
  const activitiesFile = `user-${userId}-activities.json`;

  // This reads existing user activities from file
  fs.readFile(activitiesFile, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading user's activity(ies) from file");
      return;
    }

    // This parses JSON data from file
    const activities = JSON.parse(data);

    // This generate a unique ID for the new activity
    const newActivityId = Date.now().toString();

    // This adds the new activity to the list of existing activities
    const newActivity = {
      id: newActivityId,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    };

    // This adds the new activity object to existing user activities
    activities.push(newActivity);

    // This writes updated list of activities back to file in fs
    fs.writeFile(
      `user-${req.params.id}-activities.json`,
      JSON.stringify(activities),
      (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing user's activity to file");
        } else {
          // This adds a marker to the map with the location coordinates
          // of the new activity
          const marker = {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [newActivity.longitude, newActivity.latitude],
            },
            properties: {
              title: newActivity.name,
              description: newActivity.description,
            },
          };
          // Use the MapBox API to add the marker to the map
          // Replace <ACCESS_TOKEN> with your actual MapBox access token
          const mapboxUrl = `https://api.mapbox.com/datasets/v1/<USERNAME>/<DATASET_ID>/features?access_token=QQQQQQQ`;
          fetch(mapboxUrl, {
            method: "POST",
            body: JSON.stringify(marker),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then(() => {
              res.send("Activity created successfully");
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("Error adding marker to the map");
            });
        }
      }
    );
  });
});

// This deletes an activity for a user
app.delete("/users/:id/activities/:activityId", (req, res) => {
  const userId = req.params.id;
  const activitiesFile = `user-${userId}-activities.json`;
  // This reads existing user activities from file
  fs.readFile(activitiesFile, (err, data) => {
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
    fs.writeFile(activitiesFile, JSON.stringify(activities), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing user's activity to file");
      } else {
        res.send("Activity deleted successfully");
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
