const express = require("express");
require("./db/mongoose");
const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");
const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res
    .send({
      message: "site under maintenance,check back soon",
    })
    .status(503);
});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.listen(port, () => {
  console.log("Server is up on port " + port);
});
