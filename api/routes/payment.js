const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment');
const cors = require('cors');

router.post("/payment", cors(), paymentController.processPayment);
router.post("/refund", cors(), paymentController.processRefund);

module.exports = router;
