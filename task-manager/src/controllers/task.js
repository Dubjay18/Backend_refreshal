const Task = require("../models/tasks");

class TaskController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
  async createTask() {
    const task = new Task({
      ...this.req.body,
      owner: this.req.user._id,
    });
    try {
      await task.save();
      this.res.status(201).send(task);
    } catch (error) {
      this.res.status(400).send(error);
    }
  }
  async getTasks() {
    const match = {};
    if (this.req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    this.req.query.completed;
    try {
      await this.req.user
        .populate({
          path: "tasks",
          match,
          options: {
            limit: parseInt(req.query.limit),
            skip: parseInt(req.query.skip),
          },
        })
        .execPopulate();
      res.status(200).send(this.req.user.tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async getTaskById() {
    const _id = this.req.params.id;
    try {
      const task = await Task.findOne({
        _id,
        owner: this.req.user._id,
      });
      if (!task) {
        res.status(404).send({ message: "Task not found" });
      }
      res.status(200).send(task);
    } catch (error) {
      res.status(500).send(e);
    }
  }

  static async updateTask() {
    const updates = Object.keys(this.req.body);
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
      const task = await Task.findOne({
        _id: this.req.params.id,
        owner: this.req.user._id,
      });

      if (!task) {
        return res
          .status(404)
          .send({ message: "Task not found" });
      }
      updates.forEach((update) => {
        task[update] = this.req.body[update];
      });
      await task.save();
      return res.status(200).send(task);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async deleteTask() {
    try {
      const task = await Task.findOneAndDelete({
        _id: this.req.params.id,
        owner: this.req.user._id,
      });
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
