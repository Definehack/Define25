import React from 'react';
import './mainpagestyle.css';
import StateDropdown from './components/StateDropdown';
import LoginButton from './components/LoginButton';
//import AnalyticsChart from './components/Analytics';
import AnalyticsChart from 'C:\\Users\\aadva\\fintechai\\src\\Analitics.jsx';

function MainPage() {
    return (
        <>
            
            <div className="top-controls">
                <StateDropdown />
                <LoginButton />
            </div>
            
            <div className="page-container">
                <section className="section">
                    <div className="Mainheading">Finura</div>
                    <div className="smallpara">"Empowering users with AI-driven financial insights and <br /> seamless support through a smart, user-friendly fintech <br />dashboard."</div>
                </section>
                
                <section className="section section-two">
                    <h1>Welcome to the Future</h1>
                    <p className="smallpara">Explore our services and products</p>
                </section>
                
                <div className='analytics-container'>
                <section className="section section-analytics">
                    <h2>Financial Overview</h2>
                    <p className="smallpara">Track your income and expenses effortlessly</p>
                    <AnalyticsChart />
                </section>
                </div>
            </div>
        </>
    );
}

export default MainPage;
