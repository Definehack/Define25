//Main page for the analytics section

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchGooglePayTransactions } from "./transaction"; // Adjust the import path as necessary
import './styles/analytics.css';  // Add this import

const AnalyticsChart = ({ userAccount }) => {
    const [transactionData, setTransactionData] = useState([]);
    const [year, setYear] = useState("2025");

    useEffect(() => {
        const loadTransactions = async () => {
            const transactions = await fetchGooglePayTransactions(userAccount);
            setTransactionData(transactions);
        };
        loadTransactions();
    }, [userAccount]);

    // Function to process transactions and get income & outcome per month
    const getMonthlyData = () => {
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(2025, index, 1).toLocaleString("en-US", { month: "short" }),
            income: 0,
            outcome: 0,
        }));

        transactionData.transactions?.forEach((txn) => {
            const txnDate = new Date(txn.date);
            if (txnDate.getFullYear().toString() === year) {
                const monthIndex = txnDate.getMonth();
                if (txn.receiver_account === userAccount) {
                    monthlyData[monthIndex].income += txn.amount_transferred; // Money received
                }
                if (txn.sender_account === userAccount) {
                    monthlyData[monthIndex].outcome += txn.amount_transferred; // Money spent
                }
            }
        });

        return monthlyData;
    };

    const monthlyData = getMonthlyData();

    return (
        <div className="chart-container">
            <h3>Income vs Outcome</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData} margin={{ top: 20, right: 10, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip 
                        contentStyle={{
                            background: 'rgba(18, 18, 18, 0.95)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px'
                        }}
                    />
                    <Legend />
                    <Bar 
                        dataKey="income" 
                        fill="#774EBD" 
                        name="Income"
                        barSize={15}  // Make bars thinner
                    />
                    <Bar 
                        dataKey="outcome" 
                        fill="#372457" 
                        name="Outcome"
                        barSize={15}  // Make bars thinner
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};
export default AnalyticsChart;
