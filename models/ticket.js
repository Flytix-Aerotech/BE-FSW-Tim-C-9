"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.airport, { foreignKey: "airport_id" });
      this.belongsTo(models.airplane, { foreignKey: "airplane_id" });
      this.belongsTo(models.passenger, { foreignKey: "passenger_id" });
      this.hasMany(models.booking, { foreignKey: "ticket_id" });
    }
  }
  ticket.init(
    {
      departure_date: DataTypes.DATE,
      arrival_date: DataTypes.DATE,
      departure_location: DataTypes.STRING,
      arrival_location: DataTypes.STRING,
      price: DataTypes.STRING,
      class: DataTypes.STRING,
      airport_id: DataTypes.INTEGER,
      airplane_id: DataTypes.INTEGER,
      passenger_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ticket",
    }
  );
  return ticket;
};
