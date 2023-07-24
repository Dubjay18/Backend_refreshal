const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/taskmanager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(err));
console.log("Connected correctly");
const User = mongoose.model("User", {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const me = new User({
  name: "Andrew",
  age: 27,
});

me.save()
  .then(() => {
    console.log(me);
  })
  .catch((error) => {
    console.log("Error!", error);
  });
