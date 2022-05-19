const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transactionController');

router.post('/', transactionController.handleNewTransaction);



// router.post('/', transactionController.handleNewTransaction);

module.exports = router;