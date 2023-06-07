"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.history, { foreignKey: "user_id" });
      this.hasMany(models.passenger, { foreignKey: "user_id" });
      this.hasMany(models.transaction, { foreignKey: "user_id" });
    }
  }
  user.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      password: DataTypes.STRING,
      photo: DataTypes.TEXT,
      role: {
        type: DataTypes.ENUM(["admin", "user", "guest"]),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
