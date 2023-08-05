const express = require("express");
const TaskController = require("../controllers/task");
const router = new express.Router();

router.post("/tasks", (...args) =>
  new TaskController(...args).createTask()
);
router.get("/tasks", (...args) =>
  new TaskController(...args).getTasks()
);
router.get("/tasks/:id", (...args) =>
  new TaskController(...args).getTaskById()
);
router.patch("/tasks/:id", (...args) =>
  new TaskController(...args).updateTask()
);
router.delete("/tasks/:id", (...args) =>
  new TaskController(...args).deleteTask()
);

module.exports = router;
