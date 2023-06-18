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
      this.hasMany(models.book, { foreignKey: "seat_id" }); // change from this.belongsTo(models.book, { foreignKey: "booking_id" });
      this.belongsTo(models.flight, { foreignKey: "flight_id" });
    }
  }
  seat.init(
    {
      flight_id: DataTypes.INTEGER,
      seat_number: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "seat",
    }
  );
  return seat;
};
