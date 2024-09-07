const task_categoriesService = require("../service/task_categoriesService");

const get = async (req, res, next) => {
  try {
    const task_categories = await task_categoriesService.get(req.params);
    res.status(200).json({
      message: "Success Get All Task Categories",
      data: task_categories,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const { id } = req.params;
    const task_categories = await task_categoriesService.update({
      userId,
      id,
      ...req.body,
    });
    res.status(201).json({
      message: "Success Update Task Category",
      data: task_categories,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { get, update };
