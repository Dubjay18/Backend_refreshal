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
    const user = new User(this.req.body);

    try {
      await user.save();
      const token = await user.generateAuthToken();
      return this.res.status(201).send({ user, token });
    } catch (e) {
      return this.res.status(400).send(e);
    }
  }

  async login() {
    try {
      const user = await User.findByCredentials(
        this.req.body.email,
        this.req.body.password
      );
      const token = await User.generateAuthToken();
      return this.res.send({ user, token });
    } catch (error) {
      return this.res
        .status(400)
        .send({ message: error?.message });
    }
  }
  async logout() {
    try {
      this.req.user.tokens = this.req.user.tokens.filter(
        (token) => {
          return token.token !== this.req.token;
        }
      );
      await this.req.user.save();
      this.res.status(200);
    } catch (error) {
      this.res.status(500).send();
    }
  }
  async logoutAll() {
    try {
      this.req.user.tokens = [];
      await this.req.user.save();
      this.res.status(200);
    } catch (error) {
      this.res.status(500).send();
    }
  }
  getUsers() {
    User.find({})
      .then((users) => {
        this.res.status(200).send(users);
      })
      .catch((e) => {
        this.res.status(500).send(e);
      });
  }
  async getCurrentUser() {
    try {
      this.res.send(this.req.user);
    } catch (error) {
      this.res.status(400).send(error);
    }
  }

  async updateUser() {
    const updates = Object.keys(this.req.body);
    const allowedUpdates = [
      "name",
      "email",
      "password",
      "age",
    ];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return this.res
        .status(400)
        .send({ error: "Invalid updates!" });
    }
    try {
      updates.forEach((update) => {
        this.req.user[update] = this.req.body[update];
      });
      await this.this.req.user.save();

      return this.res.send(this.req.user);
    } catch (error) {
      return this.res.status(400).send(e);
    }
  }

  async deleteUser() {
    try {
      await this.req.user.remove();
      return this.res.status(200).send(this.req.user);
    } catch (error) {
      return this.res.status(500).send(error);
    }
  }
}
module.exports = UserController;
