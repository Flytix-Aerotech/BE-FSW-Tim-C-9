const { payment, transaction } = require('../models');
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  PaymentController.createPayment = async (data) => {
    const payment = await PaymentController.create({
      type_of_payment: data.type_of_payment,
      image_brand: data.image_brand,
      price: data.price,
    });
    return payment;
  };

  PaymentController.updatePayment = async (data) => {
    const payment = await PaymentController.update({
      type_of_payment: data.type_of_payment,
      image_brand: data.image_brand,
      price: data.price,
    }, {
      where: {
        id: data.id
      }
    });
    return payment;
  };

  PaymentController.deletePayment = async (id) => {
    const payment = await PaymentController.destroy({
      where: {
        id: id
      }
    });
    return payment;
  };

  return PaymentController;
};