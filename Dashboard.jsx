import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Route, Routes, Link } from 'react-router-dom';
import '../styles/dashboard.css';
import AnalyticsChart from './Analytics';
import TransactionHistory from './TransactionHistory';
import StockTrends from './StockTrends';
import SplitPayApp from './SplitPayApp'; // Import the SplitPayApp component

function Dashboard() {
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [chatMessages, setChatMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages]);

    useEffect(() => {
        // Check authentication and set up dashboard
        const isAuth = localStorage.getItem('isAuthenticated');
        if (!isAuth) {
            navigate('/');
            return;
        }
        setIsLoading(false);
    }, [navigate]);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleLogoutConfirm = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    if (isLoading) {
        return (
            <div className="dashboard-container loading">
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    async function handleSendMessage(e) {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const message = inputMessage.trim();
        setChatMessages(prev => [...prev, { type: 'user', content: message }]);
        setInputMessage('');

        try {
            const response = await fetch('http://localhost:5174/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data); // Debug logging

            if (data && data.response) {
                setChatMessages(prev => [...prev, { 
                    type: 'bot', 
                    content: data.response
                }]);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Chat Error:', error);
            setChatMessages(prev => [...prev, { 
                type: 'bot', 
                content: 'FinBot: I apologize, but I am temporarily unable to process requests. Please try again shortly.'
            }]);
        }
    }

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo">Finura</div>
                <nav className="dashboard-nav">
                    <Link to="/" className="active">Overview</Link>
                    <Link to="/transactions">Transactions</Link>
                    <Link to="/analytics">Analytics</Link>
                    <Link to="/settings">Settings</Link>
                    <Link to="/split-pay">Split Pay</Link> {/* Add Split Pay link */}
                </nav>
                <div className="logout-container">
                    <button className="logout-btn" onClick={handleLogoutClick} style={{ width: '30px', height: '15px' }}>Logout</button>
                </div>
            </header>
            <div className="dashboard-main">
                <Routes>
                    <Route path="/" element={
                        <div className="dashboard-content">
                            <div className="dashboard-left">
                                <div className="dashboard-card">
                                    <h2>Financial Overview</h2>
                                    <AnalyticsChart />
                                </div>
                                <div className="bottom-row">
                                    <div className="bottom-row-item">
                                        <TransactionHistory />
                                    </div>
                                    <div className="bottom-row-item">
                                        <StockTrends />
                                    </div>
                                </div>
                            </div>
                        </div>
                    } />
                    <Route path="/split-pay" element={<SplitPayApp />} /> {/* Add route for Split Pay */}
                </Routes>
                <div className="dashboard-right">
                    <div className="chatbot-container">
                        <div className="chatbot-header">
                            <h3>AI Financial Assistant</h3>
                        </div>
                        <div className="chatbot-messages">
                            {chatMessages.map((msg, index) => (
                                <div key={index} className={`message ${msg.type}`}>
                                    {msg.type === 'user' ? `You: ${msg.content}` : msg.content}
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                        <form className="chatbot-input" onSubmit={handleSendMessage}>
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                placeholder="Ask about your finances..."
                            />
                            <button type="submit">Send</button>
                        </form>
                    </div>
                </div>
            </div>
            
            {showLogoutConfirm && (
                <div className="logout-confirm-overlay">
                    <div className="logout-confirm-modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to logout?</p>
                        <div className="logout-confirm-buttons">
                            <button onClick={handleLogoutConfirm}>Yes, Logout</button>
                            <button onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;