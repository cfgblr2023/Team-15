const express = require("express");
const { MongoClient } = require("mongodb");
const assert = require("assert");

const uri = "mongodb://localhost:27017/jpmc";
const dbname = "jpmc";
const { create_hash, compare_hash } = require("./helpers/hashing");
const { encode_token, verify_token } = require("./helpers/jwt_client");
const cors = require("cors");
let db;

const app = express();
app.use(cors());
app.use(express.json());

MongoClient.connect(uri)
  .then((client) => {
    console.log("Connection with database successfull");
    db = client.db();
    app.listen(8000, () => {
      console.log("Server started at port 8000");
    });
  })
  .catch((err) => console.log("Data base connection failed : ", err));

app.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body["email"];
    const password = req.body["password"];
    const type=req.body['type']
    console.log(email, password);
    const hashed_password = create_hash(password);
    console.log("reached here");
    const user = await db.collection("users").findOne({ email: email });
    if (user === null) {
      db.collection("users").insertOne({
        email: email,
        password: hashed_password,
        type: type,
      });
      res.status(200).json("User created successfully");
    } else {
      res.status(400).json("User Already exists please login");
    }
  } catch (error) {
    res.status(500).json({ "Something went wrong": error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body["email"];
    const password = req.body["password"];
    const user = await db.collection("users").findOne({ email: email });
    if (!user) {
      res.status(203).json("Account does not exist create an account first");
    }
    const valid = compare_hash(password, user["password"]);
    if (valid) {
      const filter_user = {
        _id: user["_id"],
        email: user["email"],
        type: user["type"],
      };
      const token = await encode_token(filter_user);
      res.status(200).json({ profile: filter_user, access_token: token });
    } else res.status(400).json("Invalid credentials");
  } catch (error) {
    res.status(500).json({ "Something went wrong": error });
  }
});
