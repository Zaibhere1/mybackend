const express = require("express");
const mongoose = require("mongoose");
const { findByIdAndDelete } = require("./models/user");
const app = express();
app.use(express.json());
const User = require("./models/user");

const url =
  "mongodb+srv://shahzaib:Zaib4492@cluster0.rgqq3nw.mongodb.net/?retryWrites=true&w=majority";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to the database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  });

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

app.post("/users", async (req, res) => {
  const { name, age, gender } = req.body;
  const userData = new User({
    name,
    age,
    gender,
  });

  try {
    const saveUser = await userData.save();
    res.send(saveUser);
  } catch (error) {
    res.send(error);
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const userdata = await User.findById(req.params.id);
    res.send(userdata);
  } catch (error) {
    res.send(error);
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const updateUsers = await User.findByIdAndUpdate(req.params.id, req.body);
    res.send(updateUsers);
  } catch (error) {
    res.send(error);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const deleteUser = await User.findByIdAndDelete(req.params.id);
    res.send(deleteUser);
  } catch (error) {
    res.send(error);
  }
});
app.listen(5000, () => {
  console.log("server is running");
});
