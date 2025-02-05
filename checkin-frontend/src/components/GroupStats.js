import React, { useEffect, useState } from "react";

const GroupStats = ({ goBack }) => {
    const [groupStats, setGroupStats] = useState({ groups: [], total_checkins: 0 });

    useEffect(() => {
        fetch("https://checkin-backend-xzsf.onrender.com/checkin-stats")
            .then((response) => response.json())
            .then((data) => setGroupStats(data))
            .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }, []);

    return (
        <div className="group-stats-container">
            <h2>📊 Thống kê Check-in</h2>
            <div className="total-checkin">🔥 Tổng số người đã check-in: {groupStats.total_checkins} người</div>

            <div className="stats-grid">
                {groupStats.groups.map((group, index) => (
                    <div key={index} className="stats-card">
                        <span className="group-name">{group.group_name}</span>
                        <span className="checkin-count">{group.current_checkins} người</span>
                    </div>
                ))}
            </div>

            <button className="back-btn" onClick={goBack}>⬅ Quay lại</button>
        </div>
    );
};

export default GroupStats;
