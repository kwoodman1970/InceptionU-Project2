// Sandbox for breaking...

// const port = ~~(Math.random() * 65535);

// ...& testing code!!

import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import pkg from "express-openapi-validator";
const { validate } = pkg;
import cors from "cors";
import path from "path";
import bcrypt from "bcrypt";
import fs from "fs";
import users from "./users.json" assert { type: "json" };

const app = express();
app.use(express.json());
app.use(cors());

const port = ~~(Math.random() * 65535);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.use("/spec", express.static(path.join("/openapi.yaml", "openapi.yaml")));

app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true,
    validateResponses: true,
  })
);

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
// Read existing users from file
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading users from file");
      return;
    }
    const { username, password } = req.body;
  if (users.find(user => user.username === username)) {
    return res.status(400).send("User already exists");
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUserId = Date.now().toString();
  const newUser = {
    id: newUserId,
    username: username,
    hash: hash,
    salt: salt,
  };
  users.push(newUser);
  fs.writeFile("users.json", JSON.stringify(users), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error writing users to file");
    } else {
      res.send("User created successfully");
    }
  });
});

app.post("/auth", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).send("Authentication failed");
  }

  const validPassword = bcrypt.compareSync(password, user.hash);
  if (!validPassword) {
    return res.status(401).send("Authentication failed");
  }

  res.send("Authentication successful");
});

app.listen(4200, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
