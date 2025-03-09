import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./StockTracker.css";

const StockTracker = ({ symbol = "AAPL" }) => {
    const API_KEY = "FOU3LD1ZKD1QFRFE"; // Keep this secure in a backend
    const [stockData, setStockData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchStockData = async () => {
        try {
            const response = await fetch(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`
            );
            const data = await response.json();
            
            if (data["Time Series (5min)"]) {
                const timeSeries = data["Time Series (5min)"];
                const stockDataArray = Object.keys(timeSeries).map(timestamp => ({
                    time: timestamp,
                    open: parseFloat(timeSeries[timestamp]["1. open"]),
                    high: parseFloat(timeSeries[timestamp]["2. high"]),
                    low: parseFloat(timeSeries[timestamp]["3. low"]),
                    close: parseFloat(timeSeries[timestamp]["4. close"]),
                    volume: parseInt(timeSeries[timestamp]["5. volume"]),
                }));

                setStockData(stockDataArray);
            } else {
                setError("Invalid API response. Check API limits.");
            }
        } catch (err) {
            setError("Failed to fetch stock data");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStockData();
        const interval = setInterval(fetchStockData, 60000); // Update every 60 seconds
        return () => clearInterval(interval);
    }, [symbol]);

    const chartData = {
        labels: stockData ? stockData.map(data => data.time) : [],
        datasets: [
            {
                label: "Stock Price",
                data: stockData ? stockData.map(data => data.close) : [],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
            },
        ],
    };

    return (
        <div className="stock-tracker">
            <h2>Live Stock Tracker: {symbol}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <div>
                    <Line data={chartData} />
                    <div className="stock-details">
                        <p><strong>Time:</strong> {stockData[0].time}</p>
                        <p><strong>Open:</strong> ${stockData[0].open.toFixed(2)}</p>
                        <p><strong>High:</strong> ${stockData[0].high.toFixed(2)}</p>
                        <p><strong>Low:</strong> ${stockData[0].low.toFixed(2)}</p>
                        <p><strong>Close:</strong> ${stockData[0].close.toFixed(2)}</p>
                        <p><strong>Volume:</strong> {stockData[0].volume.toLocaleString()}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StockTracker;
