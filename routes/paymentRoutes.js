const router = require('express').Router();
const auth = require('../middleware/Auth');
const Payment = require('../models/payment');

const midtransClient = require('midtrans-client');
// Create Core API instance
let coreApi = new midtransClient.CoreApi({
    isProduction: false,
    serverKey: 'SB-Mid-server-Dqiwi6G1WevBKBDPJsp6eFGq',
    clientKey: 'SB-Mid-client-z146Ib-VBrCtq9u7'
});

router.post('/charge', function (req, res, next) {
    coreApi.charge(req.body).then((chargeResponse) => {
        var dataPayment = {
            id: chargeResponse.Payment_id,
            booking_id: req.body.tiket_id,
            response_midtrans: JSON.stringify(chargeResponse)
        }
        Payment.create(dataPayment).then(data => {
            res.json({
                status: true,
                pesan: "Berhasil Payment",
                data: data
            });
        }).catch(err => {
            res.json({
                status: false,
                pesan: "Gagal Payment: " + err.message,
                data: []
            });
        });
    }).catch((e) => {
        res.json({
            status: false,
            pesan: "Gagal Payment: " + e.message,
            data: []

        });
    });
});

module.exports = router;
