const User = require("../models/users");
const {
  default: tryCatchDecorator,
} = require("../utils.js/decorators");

class UserController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  async createUser() {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await User.generateAuthToken();
      res.status(201).send({ user, token });
    } catch (e) {
      res.status(400).send(e);
    }
  }

  async login() {
    try {
      const user = await User.findByCredentials(
        req.body.email,
        req.body.password
      );
      const token = await User.generateAuthToken();
      return res.send({ user, token });
    } catch (error) {
      return res
        .status(400)
        .send({ message: error?.message });
    }
  }
  async logout() {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.status(200);
    } catch (error) {
      res.status(500).send();
    }
  }
  async logoutAll() {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.status(200);
    } catch (error) {
      res.status(500).send();
    }
  }
  getUsers() {
    User.find({})
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
  async getCurrentUser() {
    try {
      res.send(req.user);
    } catch (error) {
      res.status(400).send(error);
    }
  }

  async updateUser() {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res
        .status(400)
        .send({ error: "Invalid updates!" });
    }
    try {
      const user = await User.findById(req.params.id);
      updates.forEach((update) => {
        user[update] = req.body[update];
      });
      await user.save();
      // const user = await User.findByIdAndUpdate(
      //   req.params.id,
      //   req.body,
      //   {
      //     new: true,
      //     runValidators: true,
      //   }
      // );
      if (!user) {
        return res.status(404).send();
      }
      return res.send(user);
    } catch (error) {
      return res.status(400).send(e);
    }
  }

  async deleteUser() {
    try {
      const user = await User.findByIdAndDelete(
        req.params.id
      );
      if (!user) {
        return res
          .status(404)
          .send({ message: "User not found" });
      }
      return res.status(200).send(user);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}
module.exports = UserController;
