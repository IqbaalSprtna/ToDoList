const { Task_categories, Task, Categories } = require("../models");

const get = async (params) => {
  const task_categories = await Task_categories.findAll();

  if (!task_categories) {
    throw { id: "ErrorNotFound" };
  }

  return task_categories;
};

const update = async (params) => {
  const { id, categoryId, taskId } = params;

  console.log(params, "AAAAA");

  const taskCategoryId = parseInt(id, 10);

  const cekId = await Task_categories.findByPk(taskCategoryId);
  if (!cekId) {
    throw { id: "ErrorNotFound" };
  }

  const category = await Categories.findByPk(categoryId);
  if (!category) {
    throw { id: "ErrorNotFound" };
  }
  const task = await Task.findByPk(taskId);
  if (!task) {
    throw { id: "ErrorNotFound" };
  }

  const taskCategory = await Task_categories.update(
    {
      categoryId: categoryId || Task_categories.categoryId,
      taskId: taskId || Task_categories.taskId,
    },
    {
      where: { id: taskCategoryId },
    }
  );

  if (!taskCategory) {
    throw { id: "ErrorUpdate" };
  }

  return taskCategory;
};

module.exports = { get, update };
