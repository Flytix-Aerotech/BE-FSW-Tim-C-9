"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.transaction, { foreignKey: "payment_id" });
    }
  }
  payment.init(
    {
      type_of_payment: {
        type: DataTypes.ENUM(["Gopay", "Dana", "Akulaku"]),
      },
      image_brand: DataTypes.TEXT,
      price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "payment",
    }
  );
  return payment;
};
