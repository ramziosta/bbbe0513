const express = require('express');
const router = express.Router();
const transactionController = require('../../controllers/transactionController');

router.post('/', transactionController.handleNewTransaction);

router.route('/user/:transaction')
                .post(transactionController.handleNewTransaction);

 router.get('/', transactionController. getAllTransactions);

module.exports = router;