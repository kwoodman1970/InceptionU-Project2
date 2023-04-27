import express from "express";
import { validate } from "express-openapi-validator";
import path from "path";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import users from "./users.json";
import friends from "./friends.json";

const users = JSON.parse(fs.readFileSync("./users.json"));
const friends = JSON.parse(fs.readFileSync("./friends.json"));

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

app.get("/users/:id/friends", (req, res) => {
  res.json(friends);
});

// The following piece is from server.js, but written a bit differently
// from the above app.get method
// It declares a couple of new variables, but is the above method
// simpler/good enough?

// app.get("/users/:id/friends", (req, res) => {
//   const userId = req.params.id;
//   const userFriends = friends.friends.filter(
//     (friend) => friend.userId === userId
//   );

  res.json(userFriends);
});

app.post("/users/:id/friends", (req, res) => {
  // This reads existing user friends from file
  fs.readFile("friends.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading user's friend(s) from file");
      return;
    }

    // This parses JSON data from file.
    const friends = JSON.parse(data);

    // This generate a unique ID for the new user.
    const newFriendId = Date.now().toString();

    // This adds the new user friend to the list of existing friends.
    const newFriend = {
      id: newFriendId,
      username: req.body.username,
      password: req.body.password,
    };
    users.push(newFriend);

    // This writes updated list of users back to file in fs.
    fs.writeFile("friends.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing user's friend to file");
      } else {
        res.send("Friend created successfully");
      }
    });
  });
});

// app.listen(4200, () => console.log("Server started on port 4200"));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
