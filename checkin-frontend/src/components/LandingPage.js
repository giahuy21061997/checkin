import React from "react";

const LandingPage = ({ startCheckin, showStats }) => {
    return (
        <div className="landing-page">
            <h1>Chào mừng bạn đến với Hệ thống Check-in</h1>
            <button onClick={startCheckin}>Bắt đầu Check-in</button>
            <button onClick={showStats}>Xem thống kê</button>
        </div>
    );
};

export default LandingPage;
