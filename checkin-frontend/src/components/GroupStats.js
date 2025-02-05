import React, { useEffect, useState } from "react";

const GroupStats = ({ goBack }) => {
    const [groupStats, setGroupStats] = useState({});
    const [totalCheckins, setTotalCheckins] = useState(0);

    useEffect(() => {
        fetch("https://checkin-backend-xzsf.onrender.com/checkin-stats")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched data:", data);
                setGroupStats(data || {}); // Tránh lỗi undefined
                const total = Object.values(data || {}).reduce((sum, count) => sum + count, 0);
                setTotalCheckins(total);
            })
            .catch((error) => {
                console.error("Lỗi khi lấy dữ liệu:", error);
                setGroupStats({});
                setTotalCheckins(0);
            });
    }, []);

    return (
        <div className="group-stats-container">
            <h2>Thống kê Check-in</h2>

            {/* Hiển thị tổng số check-in */}
            <div className="total-checkins">
                <strong>Tổng số người đã check-in: {totalCheckins}</strong>
            </div>

            {/* Hiển thị danh sách nhóm */}
            <div className="stats-grid">
                {Object.keys(groupStats).length > 0 ? (
                    Object.entries(groupStats).map(([groupName, count], index) => (
                        <div key={index} className="stats-card">
                            <span className="group-name">{groupName}</span>
                            <span className="checkin-count">{count} người</span>
                        </div>
                    ))
                ) : (
                    <p>Đang tải dữ liệu...</p>
                )}
            </div>

            <button className="back-btn" onClick={goBack}>⬅ Quay lại</button>
        </div>
    );
};

export default GroupStats;
