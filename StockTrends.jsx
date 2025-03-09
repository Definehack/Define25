import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import '../styles/stockTrends.css';

const StockTrends = () => {
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [error, setError] = useState(null);
    const API_KEY = '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';
    const SYMBOLS = [
        'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA',
        'META', 'NVDA', 'JPM', 'V', 'WMT',
        'JNJ', 'PG', 'MA', 'UNH', 'HD'
    ];
    const STOCKS_PER_PAGE = 5;

    const MOCK_DATA = [
        { symbol: 'AAPL', price: 185.92, change: 2.34, percentChange: 1.25, high: 186.74, low: 184.21 },
        { symbol: 'GOOGL', price: 142.65, change: 1.87, percentChange: 1.31, high: 143.12, low: 141.23 },
        { symbol: 'MSFT', price: 378.85, change: 4.21, percentChange: 1.12, high: 379.21, low: 375.62 },
        { symbol: 'AMZN', price: 155.34, change: 2.12, percentChange: 1.38, high: 156.00, low: 153.89 },
        { symbol: 'TSLA', price: 248.48, change: -3.25, percentChange: -1.29, high: 251.45, low: 247.12 }
    ];

    const fetchStockData = async () => {
        try {
            setError(null);
            const startIdx = currentPage * STOCKS_PER_PAGE;
            const currentSymbols = SYMBOLS.slice(startIdx, startIdx + STOCKS_PER_PAGE);
            
            // Try API fetch first
            try {
                const API_KEY = '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';
                const promises = currentSymbols.map(async (symbol) => {
                    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
                    if (!response.ok) throw new Error('API request failed');
                    const data = await response.json();
                    return {
                        symbol,
                        price: data.c || 0,
                        change: data.d || 0,
                        percentChange: data.dp || 0,
                        high: data.h || 0,
                        low: data.l || 0
                    };
                });

                const results = await Promise.all(promises);
                setStockData(results.sort((a, b) => b.percentChange - a.percentChange));
            } catch (apiError) {
                console.warn('API fetch failed, using mock data', apiError);
                // Use mock data as fallback
                const mockDataForPage = MOCK_DATA.slice(startIdx, startIdx + STOCKS_PER_PAGE);
                setStockData(mockDataForPage);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error in fetchStockData:', error);
            setError('Unable to load stock data');
            setStockData(MOCK_DATA.slice(0, STOCKS_PER_PAGE)); // Fallback to mock data
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockData();
        // Remove the interval to stop auto-updates
    }, [currentPage]);

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % Math.ceil(SYMBOLS.length / STOCKS_PER_PAGE));
    };

    const prevPage = () => {
        setCurrentPage((prev) => 
            prev === 0 ? Math.ceil(SYMBOLS.length / STOCKS_PER_PAGE) - 1 : prev - 1
        );
    };

    if (error) {
        return (
            <div className="stock-trends-container error">
                <div className="error-message">{error}</div>
            </div>
        );
    }

    return (
        <div className="stock-trends-container">
            <div className="stock-trends-header">
                <button className="nav-button" onClick={prevPage}>&lt;</button>
                <h3>Top Performers</h3>
                <button className="nav-button" onClick={nextPage}>&gt;</button>
            </div>
            <div className="stock-trends-content">
                {loading ? (
                    <div className="loading">Loading market data...</div>
                ) : (
                    <div className="stock-grid">
                        {stockData.map((stock) => (
                            <div key={stock.symbol} className="stock-card">
                                <div className="stock-card-header">
                                    <span className="stock-symbol">{stock.symbol}</span>
                                    <span className={`stock-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                                        {stock.percentChange.toFixed(2)}%
                                    </span>
                                </div>
                                <div className="stock-price">${stock.price.toFixed(2)}</div>
                                <div className="stock-range">
                                    <span>L: ${stock.low.toFixed(2)}</span>
                                    <span>H: ${stock.high.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StockTrends;
