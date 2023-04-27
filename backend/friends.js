import express from "express";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const usersData = JSON.parse(fs.readFileSync("./users.json"));
const friendsData = JSON.parse(fs.readFileSync("./friends.json"));

const app = express();
app.use(express.json());

app.get("/users/:id/friends", (req, res) => {
  const userId = req.params.id;
  const userFriends = friends.friends.filter(
    (friend) => friend.userId === userId
  );

  res.json(userFriends);
});

app.post("/users/:id/friends", (req, res) => {
    // Read existing user friends from file
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
    
    // This adds the new user to the list of existing users.
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
