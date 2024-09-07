const { Categories, Task_categories } = require("../models");

const get = async (params) => {
  const { userId } = params;

  const categories = await Categories.findAll({
    where: { userId },
    include: [{ model: Task_categories }],
    order: [["id", "ASC"]],
  });

  return categories;
};

const create = async (params) => {
  const { userId, name } = params;
  const category = await Categories.create({
    userId,
    name,
  });

  if (!category) {
    throw { id: "ErrorCreate" };
  }

  return category;
};

const update = async (params) => {
  const { id, name } = params;
  console.log(params, "AAAAAAA");
  const categoryId = parseInt(id, 10);

  const category = await Categories.findByPk(categoryId);
  if (!category) {
    throw { id: "ErrorNotFound" };
  }

  const updatedCategory = await Categories.update(
    {
      name: name || Categories.name,
    },
    {
      where: { id: categoryId },
    }
  );

  if (!updatedCategory) {
    throw { id: "ErrorUpdate" };
  }

  return category;
};

const remove = async (params) => {
  const { id } = params;
  const categoryId = parseInt(id, 10);

  const category = await Categories.findByPk(categoryId);
  if (!category) {
    throw { id: "ErrorNotFound" };
  }

  const removeCategory = await category.destroy({
    where: { id: categoryId },
  });

  if (!removeCategory) {
    throw { id: "ErrorDelete" };
  }

  return category;
};

module.exports = { get, create, update, remove };
