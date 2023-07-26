const express = require("express");
const router = new express.Router();

router.post("/users", (...args) =>
  new UserController(...args).createUser()
);
router.get("/users", (...args) =>
  new UserController(...args).getUsers()
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
