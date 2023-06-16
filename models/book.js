"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.passengers, { foreignKey: "passenger_id" });
      this.belongsTo(models.tickets, { foreignKey: "ticket_id" });
      this.hasOne(models.seats, { foreignKey: "booking_id" });
      this.hasOne(models.historys, { foreignKey: "booking_id" });
      this.hasMany(models.transactions, { foreignKey: "booking_id" });
    }
  }
  
  book.init(
    {
      ticket_id: DataTypes.INTEGER,
      passenger_id: DataTypes.INTEGER,
      total_booking: DataTypes.INTEGER,
      payment_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "books",
    }
  );
  return book;
};
