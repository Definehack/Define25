import React from 'react';
import '../styles/stateDropdown.css';

function StateDropdown() {
    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
        "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
        "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    return (
        <div className="state-dropdown-container">
            <select className="state-select">
                <option value="">Select State</option>
                {indianStates.map((state, index) => (
                    <option key={index} value={state}>{state}</option>
                ))}
            </select>
        </div>
    );
}

export default StateDropdown;
