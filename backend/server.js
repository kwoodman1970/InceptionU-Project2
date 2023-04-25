import express from "express";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import fetch from "node-fetch";

const usersData = JSON.parse(fs.readFileSync("./users.json"));
const friendsData = JSON.parse(fs.readFileSync("./friends.json"));

const app = express();
app.use(express.json());

// const users = { users: [...usersData.users] };
// let friends = { friends: [...friendsData.friends] };

// CORS for API requests.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  const newUser = {
    id: uuidv4(),
    username: req.body.username,
    password: req.body.password,
  };

  users.users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/users/:id/friends", (req, res) => {
  const userId = req.params.id;
  const userFriends = friends.friends.filter(
    (friend) => friend.userId === userId
  );

  res.json(userFriends);
});

app.post("/users/:id/friends", (req, res) => {
  const userId = req.params.id;
  const newFriend = {
    id: uuidv4(),
    userId: userId,
    friendId: req.body.friendId,
  };

  friends.friends.push(newFriend);
  res.status(201).json(newFriend);
});

app.listen(4200, () => console.log("Server started on port 4200"));
