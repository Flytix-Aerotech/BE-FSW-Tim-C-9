"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class airport extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ticket, { foreignKey: "airport_id" });
    }
  }
  airport.init(
    {
      departure_name: DataTypes.STRING,
      arrival_name: DataTypes.STRING,
      departure_terminal: DataTypes.STRING,
      arrival_terminal: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "airport",
    }
  );
  return airport;
};
