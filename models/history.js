"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "user_id" });
      this.belongsTo(models.books, { foreignKey: "booking_id" });
    }
  }
  history.init(
    {
      user_id: DataTypes.INTEGER,
      booking_id: DataTypes.INTEGER,
      history_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "historys",
    }
  );
  return history;
};
