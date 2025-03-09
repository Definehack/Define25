import React from 'react';
import { fetchGooglePayTransactions } from '../utils/product_trancation';
import '../styles/transactionHistory.css';

const TransactionHistory = () => {
    const [transactions, setTransactions] = React.useState([]);

    React.useEffect(() => {
        const loadTransactions = async () => {
            const data = await fetchGooglePayTransactions();
            // Get latest 5 transactions
            const sortedData = data
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 5);
            setTransactions(sortedData);
        };
        loadTransactions();
    }, []);

    return (
        <div className="transaction-history">
            <h3>Recent Transactions</h3>
            <div className="transaction-list">
                {transactions.map((transaction, index) => (
                    <div key={index} className={`transaction-item ${transaction.type}`}>
                        <div className="transaction-info">
                            <span className="transaction-name">{transaction.name}</span>
                            <span className="transaction-date">
                                {new Date(transaction.date).toLocaleDateString()}
                            </span>
                        </div>
                        <span className="transaction-amount">
                            {transaction.type === 'income' ? '+' : '-'}
                            ${transaction.amount.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionHistory;
