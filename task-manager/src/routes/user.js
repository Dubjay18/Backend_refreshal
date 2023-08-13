const { Router } = require("express");
const UserController = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = Router();
const upload = multer({
  dest: "avatars",
});
router.post("/users", (...args) =>
  new UserController(...args).createUser()
);
router.post("/users/login", (...args) =>
  new UserController(...args).login()
);
router.get("/users/me", auth, (...args) =>
  new UserController(...args).getCurrentUser()
);
router.post("/users/logout", auth, (...args) =>
  new UserController(...args).logout()
);
router.post("/users/logout-all", auth, (...args) =>
  new UserController(...args).logoutAll()
);
router.patch("/users/me", auth, (...args) =>
  new UserController(...args).updateUser()
);
router.delete("/users/me", auth, (...args) =>
  new UserController(...args).deleteUser()
);
router.delete(
  "/users/me/avatar",
  upload.single("upload"),
  (...args) => new UserController(...args).uploadAvatar()
);

module.exports = router;
