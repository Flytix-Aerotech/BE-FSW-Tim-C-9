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
      this.belongsTo(models.user, { foreignKey: "user_id" });
      this.belongsTo(models.book, { foreignKey: "booking_id" });
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
      modelName: "history",
    }
  );
  return history;
};
