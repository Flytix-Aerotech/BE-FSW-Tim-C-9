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
      this.hasMany(models.passenger, { foreignKey: 'booking_id' });
      this.hasMany(models.seat, { foreignKey: 'booking_id' });
      this.belongsTo(models.ticket, { foreignKey: "ticket_id" });
      this.hasMany(models.history, { foreignKey: "booking_id" });
      this.hasOne(models.payment, { foreignKey: "booking_id" });
    }
  }

  book.init(
    {
      full_name: DataTypes.STRING,
      clan_name: DataTypes.STRING,
      email: DataTypes.STRING,
      phone_number: DataTypes.STRING,
      ticket_id: DataTypes.INTEGER,
      total_booking: DataTypes.INTEGER,
      total_price: DataTypes.DOUBLE,
      booking_code: DataTypes.STRING,
      payment_status: {
        type: DataTypes.ENUM("Pending", "Issued", "Cancelled"),
      },
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
