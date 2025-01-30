import React, { useEffect, useState } from "react";

const GroupStats = ({ goBack }) => {
    const [groupStats, setGroupStats] = useState([]);

    useEffect(() => {
        fetch("https://checkin-backend.onrender.com/checkin-stats")
            .then((response) => response.json())
            .then((data) => setGroupStats(data))
            .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
    }, []);

    return (
        <div className="group-stats-container">
            <h2>📊 Thống kê Check-in</h2>
            <ul>
                {groupStats.map((group, index) => (
                    <li key={index}>
                        <span>{group.group_name}</span> - <b>{group.current_checkins} người</b>
                    </li>
                ))}
            </ul>
            <button onClick={goBack}>⬅ Quay lại</button>
        </div>
    );
};

export default GroupStats;
