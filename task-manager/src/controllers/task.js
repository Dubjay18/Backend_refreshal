const Task = require("../models/tasks");

class TaskController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
  async createTask() {
    const task = new Task({
      ...req.body,
      owner: req.user,
    });
    try {
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  static getTasks() {
    Task.find({})
      .then((tasks) => {
        res.status(200).send(tasks);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }
  static getTaskById() {
    const _id = req.params.id;
    Task.findById(_id)
      .then((task) => {
        if (!task) {
          res
            .status(404)
            .send({ message: "Task not found" });
        }
        res.status(200).send(task);
      })
      .catch((e) => {
        res.status(500).send(e);
      });
  }

  static async updateTask() {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["description", "completed"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation) {
      return res
        .status(400)
        .send({ error: "Invalid updates!" });
    }

    try {
      const task = await Task.findById(req.params.id);
      updates.forEach((update) => {
        task[update] = req.body[update];
      });
      await task.save();
      // const task = await Task.findByIdAndUpdate(
      //   req.params.id,
      //   req.body,
      //   {
      //     new: true,
      //     runValidators: true,
      //   }
      // );
      if (!task) {
        return res
          .status(404)
          .send({ message: "Task not found" });
      }
      return res.status(200).send(task);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async deleteTask() {
    try {
      const task = await Task.findByIdAndDelete(
        req.params.id
      );
      if (!task) {
        return res
          .status(404)
          .send({ message: "Task not found" });
      }
      return res.status(200).send(task);
    } catch (error) {
      return res.status(500).send(error);
    }
  }
}

module.exports = TaskController;
