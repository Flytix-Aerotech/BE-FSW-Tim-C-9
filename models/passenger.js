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
      this.belongsTo(models.book, { foreignKey: "booking_id" });
    }
  }
  passenger.init(
    {
      full_name: DataTypes.STRING,
      clan_name: DataTypes.STRING,
      birth_date: DataTypes.DATEONLY,
      nik_number: DataTypes.STRING,
      nationality: DataTypes.STRING,
      passenger_role: {
        type: DataTypes.ENUM("Dewasa", "Bayi"),
      },
      booking_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "passenger",
    }
  );
  return passenger;
};
