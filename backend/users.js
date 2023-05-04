import express from "express";
import * as OpenApiValidator from "express-openapi-validator";
import pkg from "express-openapi-validator";
const { validate } = pkg;
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
// Not using this right now, b/c uudiv4
// import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import fs from "fs";
// This is a global declaration, but there is another const users nested
// inside { } a bit further down in app.post...
import users from "./users.json" assert { type: "json" };

// const userz = JSON.parse(fs.readFileSync("./users.json"));

const app = express();
app.use(express.json());
app.use(cors());

// This randomizes the port number
// const port = ~~(Math.random() * 65535);

const PORT = process.env.PORT || 4201;

// CORS for API requests.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  // I'm a little worried about using the * wildcard here,
  // since it's been declared above while importing
  // from the OpenApiValidator library...
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

// This piece serves the OpenAPI spec
app.use("/spec", express.static(path.join("/openapi.yaml", "openapi.yaml")));

// This piece validates requests & responses against the OpenAPI spec
// But it doesn't actually work here... use the documentation version below!
// app.use(
//   validate({
//     apiSpec: path.join("/openapi.yaml", "openapi.yaml"),
//   })
// );

// This is from the documentation and so actually works!!
app.use(
  OpenApiValidator.middleware({
    apiSpec: "./openapi.yaml",
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  })
);

app.get("/users", (req, res) => {
  res.json(users);
});

// Not using this right now, b/c uudiv4
// app.post("/users", (req, res) => {
//   const newUser = {
//     id: uuidv4(),
//     username: req.body.username,
//     password: req.body.password,
//   };

//   users.users.push(newUser);
//   res.status(201).json(newUser);
// });

// This uses the fs module instead of uuidv4
app.post("/users", (req, res) => {
  // Destructuring assignment syntax, extracts username/password properties
  // from the req.body object, can store them in separate variables
  const { username, password } = req.body;
  // Read existing users from file
  fs.readFile("users.json", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading users from file");
      return;
    }

    // This parses JSON data from file.
    // This is the 2nd declaration of const users, but inside the app.post
    // function's function
    const users = JSON.parse(data);

    // This generate a unique ID for the new user.
    // Duplicate code in line 111
    const newUserId = Date.now().toString();

    // This checks if user already exists
    if (users.find((user) => user.username === username)) {
      return res.status(400).send("User already exists");
    }

    // // This adds the new user to the list of existing users.
    // const newUser = {
    //   id: newUserId,
    //   username: username // req.body.username
    //   password: password // req.body.password
    // };

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    // This generate a unique ID for the new user.
    // Duplicate code for generating newUserID, but leaving it
    // in here as a placeholder
    // just in case my placement is wrong
    // const newUserId = Date.now().toString();

    // This checks if user already exists
    if (users.find((user) => user.username === username)) {
      return res.status(400).send("User already exists");
    }
    // This adds the new user to the list of existing users.
    const newUser = {
      id: newUserId,
      username: username, // req.body.username
      hash: hash,
      salt: salt,
    };

    // Adds the new user to the user data
    users.push(newUser);

    // This writes updated list of users back to file in fs.
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error writing users to file");
      } else {
        res.send("User created successfully");
      }
    });
  });
});

app.post("/auth", (req, res) => {
  // Extracting the username and password from the request body
  const { username, password } = req.body;
  // Finding the user in the users array that matches the entered username
  const user = users.find((user) => user.username === username);
  if (!user) {
    // If the user doesn't exist, return an error message
    return res.status(401).send("Authentication failed");
  }
  // Comparing the entered password with the hashed password of the user
  const validPassword = bcrypt.compareSync(password, user.hash);
  if (!validPassword) {
    // If the password doesn't match, return an error message
    return res.status(401).send("Authentication failed");
  }
  // If the password is correct, return a success message
  res.send("Authentication successful");
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
