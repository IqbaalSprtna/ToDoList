const categoriesService = require("../service/categoriesService");

const get = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const categories = await categoriesService.get({ userId });
    res
      .status(200)
      .json({ message: "Success Get All categories", data: categories });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const category = await categoriesService.create({ userId, ...req.body });
    res
      .status(201)
      .json({ message: "Success Create category", data: category });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const { id } = req.params;
    const category = await categoriesService.update({
      id,
      userId,
      ...req.body,
    });
    res
      .status(200)
      .json({ message: "Success Update category", data: category });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const userId = req.loggedUser.id;
    const { id } = req.params;
    const category = await categoriesService.remove({ id, userId });
    res
      .status(200)
      .json({ message: "Success Remove category", data: category });
  } catch (error) {
    next(error);
  }
};

module.exports = { get, create, update, remove };
