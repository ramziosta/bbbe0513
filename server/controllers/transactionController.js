const Transaction = require('../model/transaction.model')
const User = require('../model/client.model')

const handleNewTransaction = async (req, res) => {
  const { amount, balance, transactionDate, transactionType } = req.body;
  
  try {
    const newTransaction = await User.transactions.create(
      { amount: amount,
        transactionDate: transactionDate,
        transactionType: transactionType,
      });

    console.log(newTransaction);
    res.status(201).json({ success: `Your ${newTransaction.transactionType} successful!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTransactions = async (req, res) => {
  const transactions = await Transaction.find();
  if (!transactions) return res.status(204).json({ 'message': 'No transactions found' });
  res.json(transactions);
}


module.exports = { handleNewTransaction, 
                  getAllTransactions, 
                };