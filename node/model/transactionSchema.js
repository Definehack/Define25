const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    userEmail: { type: String, required: true, index: true },
    transactions: [
        {
            balance: { type: String, required: true },
            date: { type: String, required: true },
            deposits: { type: String, default: "0.00" },
            description: { type: String, required: true },
            withdrawals: { type: String, default: "0.00" }
        }
    ]
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;
