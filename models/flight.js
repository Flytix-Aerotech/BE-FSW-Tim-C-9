"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.tickets, { foreignKey: "flight_id" });
      this.hasMany(models.seats, { foreignKey: "flight_id" });
    }
  }
  flight.init(
    {
      flight_number: DataTypes.INTEGER,
      departure_date: DataTypes.DATE,
      arrival_date: DataTypes.DATE,
      departure_location: DataTypes.STRING,
      arrival_location: DataTypes.STRING,
      from_id: DataTypes.CHAR,
      to_id: DataTypes.CHAR,
      airline: DataTypes.STRING,
      capacity: DataTypes.INTEGER,
      economy_class_price: DataTypes.DOUBLE,
      business_class_price: DataTypes.DOUBLE,
      first_class_price: DataTypes.DOUBLE,
      quiet_class_price: DataTypes.DOUBLE,
      type_of_flight: {
        type: DataTypes.ENUM(["OneWay", "RoundTrip"]),
      },
    },
    {
      sequelize,
      modelName: "flights",
    }
  );
  return flight;
};
