import React, { useEffect, useState } from "react";

const GroupStats = ({ goBack }) => {
    const [groupStats, setGroupStats] = useState([]);

    useEffect(() => {
        fetch("https://checkin-backend-xzsf.onrender.com/checkin-stats")
            .then((response) => response.json())
            .then((data) => setGroupStats(data))
            .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }, []);

    return (
        <div className="group-stats-container">
            <h2>Thống kê Check-in</h2>
            
            <div className="stats-grid">
                {Object.entries(groupStats).map(([groupName, count], index) => (
                    <div key={index} className="stats-card">
                        <span className="group-name">{groupName}</span>
                        <span className="checkin-count">{count} người</span>
                    </div>
                ))}
            </div>

            <button className="back-btn" onClick={goBack}>⬅ Quay lại</button>
        </div>
    );
};

export default GroupStats;
