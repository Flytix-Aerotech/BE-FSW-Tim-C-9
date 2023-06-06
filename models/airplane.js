"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.ticket, { foreignKey: "airplane_id" });
    }
  }
  airplane.init(
    {
      airplane_code: DataTypes.STRING,
      name: DataTypes.STRING,
      baggage_capacity: DataTypes.STRING,
      cabin_baggage_capacity: DataTypes.STRING,
      detail_airplane: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "airplane",
    }
  );
  return airplane;
};
