//Main page for the analytics section

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AnalyticsChart = ({ data }) => {
    return (
        <div className="chart-container">
            <h3>Income vs Outcome</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="month" stroke="#fff" />
                    <YAxis stroke="#fff" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="income" fill="#4C8BF5" name="Income" />
                    <Bar dataKey="outcome" fill="#9B59B6" name="Outcome" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AnalyticsChart;
