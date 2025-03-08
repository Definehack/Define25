import React, { useState } from "react";
import './styles/navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        document.body.classList.toggle("open");
    };

    return (
        <>
            <div className={`background ${isOpen ? 'active' : ''}`}></div>
            <label className="burger">
                <input type="checkbox" checked={isOpen} onChange={toggleMenu} />
                <span className="burger-icon"></span>
            </label>
            <nav className={`menu ${isOpen ? 'active' : ''}`}>
                <div className="nav-links">
                    <a href="/">Home</a>
                    <a href="/store">Store</a>
                    <a href="/insurance">Insurance</a>
                    <a href="/history">History</a>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
