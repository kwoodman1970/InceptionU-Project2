import express from "express";
import { v4 as uuidv4 } from "uuid";
import usersData from "./users.json";

const app = express();
app.use(express.json());

const users = { users: [...usersData.users] };

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

app.listen(4200, () => console.log("Server started on port 4200"));
