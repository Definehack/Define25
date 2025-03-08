import React, { useState } from 'react';
import '../styles/loginModal.css';
import { authenticateUser } from '../utils/userData';

function LoginModal({ onClose }) {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = authenticateUser(credentials.email, credentials.password);
        
        if (result.success) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', JSON.stringify(result.user));
            window.location.href = '/dashboard';
            onClose();
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>&times;</button>
                <h2>Login</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                    />
                    <button type="submit">Sign In</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                <div className="login-footer">
                    <a href="#">Forgot Password?</a>
                    <a href="#">Create Account</a>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
