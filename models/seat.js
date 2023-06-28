"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class seat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.book, { foreignKey: "booking_id" });
      this.belongsTo(models.ticket, { foreignKey: "ticket_id" });
    }
  }
  seat.init(
    {
      booking_id: DataTypes.INTEGER,
      ticket_id: DataTypes.INTEGER,
      seat_number: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "seat",
    }
  );
  return seat;
};
