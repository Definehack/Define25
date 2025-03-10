const Transaction = require("../model/transactionSchema");

exports.storeTransactions = async (email, transactions) => {
    try {
        if (!transactions || transactions.length === 0) {
            throw new Error("No transactions provided");
        }

        for (let transaction of transactions) {

            let userTransaction = await Transaction.findOne({ userEmail: email });
            
            if (!userTransaction) {
                userTransaction = new Transaction({ userEmail:email, transactions: [] });
            }
           
            userTransaction.transactions.push(transaction);
        
            await userTransaction.save();
        }

        return { success: true, message: "Transactions stored successfully!" };
    } catch (error) {
        console.error("Error storing transactions:", error);
        throw new Error("Failed to store transactions.");
    }
};
