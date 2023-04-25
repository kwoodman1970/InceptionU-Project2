import express from "express";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const usersData = JSON.parse(fs.readFileSync("./users.json"));
const friendsData = JSON.parse(fs.readFileSync("./friends.json"));

const app = express();
app.use(express.json());

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

  app.post("/users", (req, res) => {
    // Read existing users from file
    fs.readFile("users.json", (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error reading users from file");
        return;
      }
  
      // This parses JSON data from file.
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
  
  app.get("/users/:id/friends", (req, res) => {
    const userId = req.params.id;
    const userFriends = friends.friends.filter(
      (friend) => friend.userId === userId
    );