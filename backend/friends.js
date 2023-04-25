import express from "express";
// import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const usersData = JSON.parse(fs.readFileSync("./users.json"));
const friendsData = JSON.parse(fs.readFileSync("./friends.json"));

const app = express();
app.use(express.json());

