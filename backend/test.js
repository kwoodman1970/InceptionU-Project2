// Sandbox for breaking...

// const port = ~~(Math.random() * 65535);

// ...& testing code!!


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
  
      const activities = JSON.parse(data);
  
      // This creates a new activity object with provided details
      const newActivity = {
        name: req.body.name,
        description: req.body.description,
        longitude: req.body.longitude,
        latitude: req.body.latitude
      };
  
      // This adds the new activity object to existing user activities
      activities.push(newActivity);
  
      // This writes updated user activities back to file
      fs.writeFile(
        activitiesFile,
        JSON.stringify(activities),
        (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Error writing user's activity(ies) to file");
            return;
          }
  
          res.status(201).send(newActivity);
        }
      );
    });
  });
  
  