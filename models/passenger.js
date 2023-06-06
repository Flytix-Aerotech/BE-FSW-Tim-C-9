"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.book, { foreignKey: "passenger_id" });
      this.hasOne(models.ticket, { foreignKey: "passenger_id" });
      this.belongsTo(models.user, { foreignKey: "user_id" });
    }
  }
  passenger.init(
    {
      fullname: DataTypes.STRING,
      birth_date: DataTypes.DATEONLY,
      nik_number: DataTypes.STRING,
      nationality: DataTypes.STRING,
      passenger_role: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "passenger",
    }
  );
  return passenger;
};
