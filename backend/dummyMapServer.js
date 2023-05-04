const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [-122.4194, 37.7749],
    zoom: 12,
  });
  

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
          <script src="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.js"></script>
          <link href="https://api.mapbox.com/mapbox-gl-js/v2.3.1/mapbox-gl.css" rel="stylesheet" />
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
            mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
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
  