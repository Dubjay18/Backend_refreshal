const { Router } = require("express");
const UserController = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = Router();
const upload = multer({
  dest: "avatars",
  limits: {
    fileSize: 100000,
  },
  fileFilter(req, file, cb) {
    if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload a word documnets."));
    }
    cb(undefined, true);
  },
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
router.post(
  "/users/me/avatar",
  upload.single("upload"),
  (...args) => new UserController(...args).uploadAvatar()
);

module.exports = router;
