const mongoose = require("mongoose");
const User = require("../models/users");
const Task = require("../models/tasks");

mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
console.log("Connected correctly");
