"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task_categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task_categories.belongsTo(models.Task, { foreignKey: "taskId" });
      Task_categories.belongsTo(models.Categories, {
        foreignKey: "categoryId",
      });
    }
  }
  Task_categories.init(
    {
      taskId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Tasks",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Task_categories",
    }
  );
  return Task_categories;
};
