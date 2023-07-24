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

// const me = new User({
//   name: "Mike",
//   email: "Myemail@Head.to",
//   password: "qwertyuiop",
// });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });

// const task = new Task({
//   description: "Learn the Mongoose library",
//   completed: false,
// });

// task
//   .save()
//   .then(() => {
//     console.log(task);
//   })
//   .catch((error) => {
//     console.log("Error!", error);
//   });
