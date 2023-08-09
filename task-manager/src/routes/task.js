const express = require("express");
const TaskController = require("../controllers/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, (...args) =>
  new TaskController(...args).createTask()
);
router.get("/tasks", auth, (...args) =>
  new TaskController(...args).getTasks()
);
router.get("/tasks/:id", auth, (...args) =>
  new TaskController(...args).getTaskById()
);
router.patch("/tasks/:id", auth, (...args) =>
  new TaskController(...args).updateTask()
);
router.delete("/tasks/:id", auth, (...args) =>
  new TaskController(...args).deleteTask()
);

module.exports = router;
