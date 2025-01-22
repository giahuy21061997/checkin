import React, { useState, useEffect } from "react";
import axios from "axios";

const GroupList = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const response = await axios.get("https://192.168.2.10:5000/groups");
                setGroups(response.data); // Lưu danh sách nhóm
                setLoading(false);
            } catch (err) {
                console.error("Error fetching groups:", err);
                setError("Không thể lấy dữ liệu nhóm.");
                setLoading(false);
            }
        };

        fetchGroups();
    }, []);

    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Danh sách nhóm</h2>
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
                <thead>
                    <tr>
                        <th>Tên Nhóm</th>
                        <th>Check-in Hiện Tại</th>
                        <th>Tối Đa</th>
                        <th>Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => (
                        <tr key={group.id}>
                            <td>{group.group_name}</td>
                            <td>{group.current_checkins}</td>
                            <td>{group.max_checkins}</td>
                            <td>
                                {group.current_checkins < group.max_checkins
                                    ? "Còn chỗ"
                                    : "Hết chỗ"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GroupList;