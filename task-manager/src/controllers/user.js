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

    user
      .save()
      .then(() => {
        res.status(201).send(user);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  }
  @tryCatchDecorator()
  async login() {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await User.generateAuthToken();
    res.send({ user, token });
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
  getUserById() {
    const _id = req.params.id;
    User.findById(_id)
      .then((user) => {
        if (!user) {
          res
            .status(404)
            .send({ message: "User not found" });
        }
        res.status(200).send(user);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
  @tryCatchDecorator()
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
    res.send(user);
  }
  @tryCatchDecorator(500)
  async deleteUser() {
    const user = await User.findByIdAndDelete(
      req.params.id
    );
    if (!user) {
      return res
        .status(404)
        .send({ message: "User not found" });
    }
    return res.status(200).send(user);
  }
}
module.exports = UserController;
