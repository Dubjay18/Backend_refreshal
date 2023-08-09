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
      owner: req.user._id,
    });
    try {
      await task.save();
      res.status(201).send(task);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  async getTasks() {
    try {
      const tasks = await Task.find({
        owner: req.user._id,
      });
      res.status(200).send(tasks);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async getTaskById() {
    const _id = req.params.id;
    try {
      const task = await Task.findOne({
        _id,
        owner: req.user._id,
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
      const task = await Task.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      if (!task) {
        return res
          .status(404)
          .send({ message: "Task not found" });
      }
      updates.forEach((update) => {
        task[update] = req.body[update];
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
        _id: req.params.id,
        owner: req.user._id,
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
