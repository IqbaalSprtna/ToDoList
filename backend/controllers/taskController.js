const taskService = require("../service/taskService");

const get = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const tasks = await taskService.get({ userId, status: "false" });
    res.status(200).json({ message: "Success Get All Tasks", data: tasks });
  } catch (error) {
    next(error);
  }
};

const getCompleteTask = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const tasks = await taskService.get({ userId, status: "true" });
    res
      .status(200)
      .json({ message: "Success Get All Completed Tasks", data: tasks });
  } catch (error) {
    next(error);
  }
};

const getTaskByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const tasks = await taskService.getTaskCategory({ categoryId });
    res
      .status(200)
      .json({ message: "Success Get Tasks By Category", data: tasks });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const task = await taskService.create({ userId, ...req.body });
    res.status(201).json({ message: "Success Create Task", data: task });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const { taskId } = req.params;
    const updatedTask = await taskService.update({
      userId,
      taskId,
      ...req.body,
    });
    res.status(200).json({ message: "Success Update Task", data: updatedTask });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const { taskId } = req.params;
    await taskService.remove({ userId, taskId });
    res.status(200).json({ message: "Success Delete Task" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getCompleteTask,
  getTaskByCategory,
  create,
  update,
  remove,
};
