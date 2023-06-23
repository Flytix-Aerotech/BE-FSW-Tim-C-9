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
      this.belongsTo(models.book, { foreignKey: "booking_id" });
    }
  }
  payment.init(
    {
      booking_id: DataTypes.INTEGER,
      type_of_payment: {
        type: DataTypes.ENUM("Gopay", "Dana", "Akulaku"),
      },
      price: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "payment",
    }
  );
  return payment;
};
