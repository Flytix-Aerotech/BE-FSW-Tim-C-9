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
      this.belongsTo(models.passenger, { foreignKey: "passenger_id" });
      this.belongsTo(models.ticket, { foreignKey: "ticket_id" });
      this.belongsTo(models.seat, { foreignKey: "seat_id" });
      this.hasOne(models.history, { foreignKey: "booking_id" });
      this.hasOne(models.payment, { foreignKey: "booking_id" });
    }
  }

  book.init(
    {
      ticket_id: DataTypes.INTEGER,
      passenger_id: DataTypes.INTEGER,
      seat_id: DataTypes.INTEGER,
      full_name: DataTypes.STRING,
      clan_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      total_booking: DataTypes.INTEGER,
      total_price: DataTypes.DOUBLE,
      booking_code: DataTypes.STRING,
      payment_status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
