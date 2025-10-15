const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, required: true },
  category: { 
    type: String, 
    enum: [
      'Rent',
      'Food',
      'Transport',
      'Entertainment',
      'Utilities',
      'Shopping',
      'Health',
      'Education',
      'Other'
    ], 
    required: true 
  },
  date: { type: Date, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);