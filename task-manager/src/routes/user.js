const express = require("express");
const UserController = require("../controllers/user");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/users", (...args) =>
  new UserController(...args).createUser()
);
router.post("/users/login", (...args) =>
  new UserController(...args).login()
);
router.get("/users/me", auth, (...args) =>
  new UserController(...args).getCurrentUser()
);

router.get("/users/:id", (...args) =>
  new UserController(...args).getUserById()
);
router.patch("/users/:id", (...args) =>
  new UserController(...args).updateUser()
);

router.delete("/users/:id", (...args) =>
  new UserController(...args).deleteUser()
);

module.exports = router;
