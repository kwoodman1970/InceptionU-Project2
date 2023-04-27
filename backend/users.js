import express from "express";
import { validate } from "express-openapi-validator";
import path from "path";
// Not using this right now, b/c uudiv4
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import users from "./users.json" assert { type: "json" };

// Looks like I can import/declare users first, then make it a const?
// This is a global declaration, but there is another const users nested
// inside { } a bit further down in app.post...
const users = JSON.parse(fs.readFileSync("./users.json"));

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
    const newUserId = Date.now().toString();

    // This adds the new user to the list of existing users.
    const newUser = {
      id: newUserId,
      username: req.body.username,
      password: req.body.password,
    };
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

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// Should this be in friends.js?

// app.get("/users/:id/friends", (req, res) => {
//   const userId = req.params.id;
//   const userFriends = friends.friends.filter(
//     (friend) => friend.userId === userId
//   );
// });
