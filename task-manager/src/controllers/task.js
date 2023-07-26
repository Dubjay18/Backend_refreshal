const Task = require("../models/tasks");

class TaskController {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }
  static createTask() {
    const task = new Task(req.body);
    task
      .save()
      .then(() => {
        res.status(201).send(task);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
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
  @tryCatchDecorator()
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

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found" });
    }
    return res.status(200).send(task);
  }
  @tryCatchDecorator(500)
  static async deleteTask() {
    const task = await Task.findByIdAndDelete(
      req.params.id
    );
    if (!task) {
      return res
        .status(404)
        .send({ message: "Task not found" });
    }
    return res.status(200).send(task);
  }
}
