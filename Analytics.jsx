import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchGooglePayTransactions } from "../utils/product_trancation.jsx";  // Add .jsx extension

const AnalyticsChart = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [year, setYear] = useState("2024");

    useEffect(() => {
        // Fetch transactions (Replace with real API call)
        const loadTransactions = async () => {
            const transactions = await fetchGooglePayTransactions();
            setTransactionData(transactions);
        };
        loadTransactions();
    }, []);

    // Function to process transactions and get income & outcome per month
    const getMonthlyData = () => {
        const monthlyData = Array.from({ length: 12 }, (_, index) => ({
            month: new Date(2024, index, 1).toLocaleString("en-US", { month: "short" }),
            income: 0,
            outcome: 0,
        }));

        transactionData.forEach((txn) => {
            const txnDate = new Date(txn.date);
            const txnYear = txnDate.getFullYear().toString();
            if (txnYear === year) {
                const monthIndex = txnDate.getMonth();
                if (txn.type === "income") {
                    monthlyData[monthIndex].income += txn.amount;
                } else if (txn.type === "outcome") {
                    monthlyData[monthIndex].outcome += txn.amount;
                }
            }
        });

        return monthlyData;
    };

    return (
        <div className="analytics-container">
            <h2>Analytics</h2>
            <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                className="year-select"
            >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
            </select>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={getMonthlyData()}>
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.7)" />
                    <YAxis stroke="rgba(255,255,255,0.7)" />
                    <Tooltip 
                        contentStyle={{
                            background: '#1A1A1A',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff'
                        }}
                    />
                    <Legend />
                    <Bar dataKey="income" fill="#774EBD" name="Income" />
                    <Bar dataKey="outcome" fill="#372457" name="Outcome" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsChart;