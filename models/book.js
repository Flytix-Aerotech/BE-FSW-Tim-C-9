"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.passenger, { foreignKey: "passenger_id" });
      this.belongsTo(models.ticket, { foreignKey: "ticket_id" });
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  }
  book.init(
    {
      ticket_id: DataTypes.INTEGER,
      passenger_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      total_booking: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
