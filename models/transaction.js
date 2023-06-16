"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: "user_id" });
      this.belongsTo(models.payments, { foreignKey: "payment_id" });
      this.belongsTo(models.books, { foreignKey: "booking_id" });
    }
  }
  transaction.init(
    {
      booking_id: DataTypes.INTEGER,
      payment_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      total_price: DataTypes.DOUBLE,
      trans_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "transactions",
    }
  );
  return transaction;
};
