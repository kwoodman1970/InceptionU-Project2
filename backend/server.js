import express from "express";
import { validate } from "express-openapi-validator";
import path from "path";

// @@@Not using this right now, b/c uudiv4@@@
// import { v4 as uuidv4 } from "uuid";

// @@@Not using fs module in the server.js, b/c not using app.post here anymore
// So... prolly no need to import the fs module here?
// Does this make the code more efficient, performance-wise?@@@
// import fs from "fs";

import users from "./users.json";
import friends from "./friends.json";

const app = express();
app.use(express.json());

// @@@@Not using these right now, b/c uudiv4@@@
// const users = { users: [...usersData.users] };
// let friends = { friends: [...friendsData.friends] };

// This piece serves the OpenAPI spec
app.use("/spec", express.static(path.join("/openapi.yaml", "openapi.yaml")));

// This piece validates requests & responses against the OpenAPI spec
app.use(
  validate({
    apiSpec: path.join("/openapi.yaml", "openapi.yaml"),
  })
);

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
