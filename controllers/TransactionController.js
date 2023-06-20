const { transaction, book, passenger, ticket } = require('../models/');

const addTransaction = async (req, res) => {
    const payId = (length = 8) => {
        return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
    };
    try {
        const createTransaction = await transaction.create({
            booking_id: req.book.id,
            payment_id: payId,
            user_id: req.user.id,
            total_price: req.book.total_price,
            payment_status: false,
        });
        
        res.status(200).json({
            createTransaction,
        });
    } catch (error) {
        res.status(error.statusCode || 500).json({
            message: error.message,
        });
    }
};

const payTransaction = async (req, res) => {
    try {
        const { code } = req.params;
        const data = await book.findOne({
            where: {
                booking_code: code
            },
            include: [
                { model: transaction },
                { model: ticket },
                { model: passenger },
            ],
        });
        res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(error.statusCode || 404).json({
            message: error.message,
        });
    }
};

module.exports = {
    addTransaction,
    payTransaction,
};