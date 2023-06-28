"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.airport, { foreignKey: "airport_id" });
      this.belongsTo(models.flight, { foreignKey: "flight_id" });
      this.hasMany(models.book, { foreignKey: "ticket_id" });
      this.hasMany(models.seat, { foreignKey: "ticket_id" });
    }
  }
  ticket.init(
    {
      price: DataTypes.DOUBLE,
      type_of_class: {
        type: DataTypes.ENUM("Economy", "Business", "First", "Premium"),
      },
      airport_id: DataTypes.INTEGER,
      flight_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ticket",
    }
  );
  return ticket;
};
