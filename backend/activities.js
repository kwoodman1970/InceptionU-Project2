import express from "express";
import { validate } from "express-openapi-validator";
import path from "path";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import users from "./users.json" assert {type: "json"};
import activities from "./activities.json" assert {type: "json"};

const users = JSON.parse(fs.readFileSync("./users.json"));
const activities = JSON.parse(fs.readFileSync("./activities.json"));

const app = express();
app.use(express.json());

// This piece serves the OpenAPI spec
app.use("/spec", express.static(path.join("/openapi.yaml", "openapi.yaml")));

// This piece validates requests & responses against the OpenAPI spec
app.use(
  validate({
    apiSpec: path.join("/openapi.yaml", "openapi.yaml"),
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

// Delete an activity for a user
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
