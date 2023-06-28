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
      this.hasMany(models.ticket, { foreignKey: "flight_id" });
    }
  }
  flight.init(
    {
      flight_number: DataTypes.STRING,
      departure_time: DataTypes.TIME,
      arrival_time: DataTypes.TIME,
      departure_date: DataTypes.DATEONLY,
      arrival_date: DataTypes.DATEONLY,
      departure_location: DataTypes.STRING,
      arrival_location: DataTypes.STRING,
      from_id: DataTypes.CHAR,
      to_id: DataTypes.CHAR,
      airline: DataTypes.STRING,
      type_of_flight: {
        type: DataTypes.ENUM("OneWay", "RoundTrip"),
      },
    },
    {
      sequelize,
      modelName: "flight",
    }
  );
  return flight;
};
