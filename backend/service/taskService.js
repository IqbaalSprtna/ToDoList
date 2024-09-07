const { Task, Task_categories } = require("../models");

const get = async (params) => {
  const { userId, status } = params;

  const tasks = await Task.findAll({
    where: { userId, status },
    include: [{ model: Task_categories }],
    order: [["id", "ASC"]],
  });

  if (!tasks) {
    throw { id: "ErrorNotFound" };
  }

  return tasks;
};

const getTaskCategory = async (params) => {
  const { categoryId } = params;

  let tasks;
  if (categoryId) {
    tasks = await Task.findAll({
      include: {
        model: Task_categories,
        where: { categoryId },
      },
      order: [["id", "ASC"]],
    });
  } else {
    tasks = await Task.findAll({
      order: [["id", "ASC"]],
    });
  }

  if (!tasks) {
    throw { id: "ErrorNotFound" };
  }

  return tasks;
};

const create = async (params) => {
  const { userId, title, description, categoryId } = params;
  const task = await Task.create({
    userId,
    title,
    description,
  });

  const createTask = await Task_categories.create({
    taskId: task.id,
    categoryId: categoryId,
  });

  if (!createTask) {
    throw { id: "ErrorCreate" };
  }

  return task;
};

const update = async (params) => {
  const { taskId, title, description, categoryId, isCompleted } = params;

  const task_id = parseInt(taskId, 10);

  const task = await Task.findByPk(task_id);
  if (!task) {
    throw { id: "ErrorNotFound" };
  }

  const updateTask = await Task.update(
    {
      title: title || task.title,
      description: description || task.description,
      status: isCompleted !== undefined ? isCompleted : task.status,
    },
    {
      where: { id: task_id },
    }
  );

  const taskCategory = await Task_categories.findOne({
    where: { taskId: task.id },
  });

  if (taskCategory) {
    await Task_categories.update(
      {
        categoryId,
      },
      { where: { taskId: task_id } }
    );
  } else {
    await Task_categories.create({
      taskId: task.id,
      categoryId,
    });
  }

  if (!updateTask) {
    throw { id: "ErrorUpdate" };
  }

  return task;
};

const remove = async (params) => {
  const { taskId } = params;

  const task_id = parseInt(taskId, 10);
  const task = await Task.findByPk(task_id);
  if (!task) {
    throw { id: "ErrorNotFound" };
  }

  const removeTask = await Task.destroy({
    where: { id: task_id },
  });

  if (!removeTask) {
    throw { id: "ErrorRemove" };
  }

  return task;
};

module.exports = { get, getTaskCategory, create, update, remove };
