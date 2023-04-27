import express from "express";
import { v4 as uuidv4 } from "uuid";
import usersData from "./users.json";
import friendsData from "./friends.json";

const app = express();
app.use(express.json());

const users = { users: [...usersData.users] };
let friends = { friends: [...friendsData.friends] };

app.get("/users", (req, res) => {
  res.json(users);
});

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
