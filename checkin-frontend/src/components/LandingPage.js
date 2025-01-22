import React from "react";

const LandingPage = ({ startCheckin }) => {
    return (
        <div className="landing-page">
            <h1>Chào mừng bạn đến với Hệ thống Check-in</h1>
            <p>Quét mã vạch để bắt đầu check-in!</p>
            <button onClick={startCheckin}>Bắt đầu Check-in</button>
        </div>
    );
};

export default LandingPage;