const Transaction = require('../model/transaction.model')


const handleNewTransaction = async (req, res) => {
  const { amount, balance, transactionDate, transactionType, accountType } = req.body;
  
  try {
    const newTransaction = await Transaction.create(
      { amount: amount,
        balance: balance,
        transactionDate: transactionDate,
        transactionType: transactionType,
        accountType: accountType,
      });

    console.log(newTransaction);
    res.status(201).json({ success: `Yout ${newTransaction.transactionType} successful!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewTransaction };