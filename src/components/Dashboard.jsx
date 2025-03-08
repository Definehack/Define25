import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/dashboard.css';
import AnalyticsChart from './Analytics';

function Dashboard() {
    const navigate = useNavigate();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const handleLogoutConfirm = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('currentUser');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="logo">Finura</div>
                <nav className="dashboard-nav">
                    <a href="#" className="active">Overview</a>
                    <a href="#">Transactions</a>
                    <a href="#">Analytics</a>
                    <a href="#">Settings</a>
                </nav>
                <button className="logout-btn" onClick={handleLogoutClick}>Logout</button>
            </header>
            
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

            <div className="dashboard-content">
                <div className="dashboard-left">
                    <div className="dashboard-card">
                        <h2>Financial Overview</h2>
                        <AnalyticsChart />
                    </div>
                </div>
                
                <div className="dashboard-right">
                    <div className="chatbot-container">
                        <div className="chatbot-header">
                            <h3>AI Assistant</h3>
                        </div>
                        <div className="chatbot-messages">
                            <div className="message bot">
                                Hello! How can I help you with your finances today?
                            </div>
                        </div>
                        <div className="chatbot-input">
                            <input type="text" placeholder="Type your message..." />
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;