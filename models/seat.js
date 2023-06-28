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
      this.belongsTo(models.book, { foreignKey: 'booking_id' });
      this.belongsTo(models.ticket, { foreignKey: "ticket_id" });
    }
  }
  seat.init(
    {
      seat_number: DataTypes.INTEGER,
      booking_id: DataTypes.INTEGER,
      ticket_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "seat",
    }
  );
  return seat;
};
