import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import axios from "axios";

const CheckinPage = () => {
    const [barcode, setBarcode] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [checkinDetails, setCheckinDetails] = useState(null); // Lưu thông tin nhóm sau khi check-in

    const handleScanSuccess = (scannedBarcode) => {
        setBarcode(scannedBarcode);
        setStatusMessage(""); // Reset thông báo
        setCheckinDetails(null); // Reset thông tin nhóm
    };

    const handleCheckin = async () => {
        if (!barcode) {
            setStatusMessage("Vui lòng quét mã vạch trước.");
            return;
        }

        try {
            const response = await axios.post("https://192.168.2.10:5000/checkin", {
                barcode,
            });

            if (response.data.success) {
                setCheckinDetails({
                    groupName: response.data.groupName,
                    currentCheckins: response.data.currentCheckins,
                    maxCheckins: response.data.maxCheckins,
                });
                setStatusMessage("Check-in thành công!");
            } else {
                setStatusMessage(response.data.message || "Check-in thất bại.");
            }
        } catch (error) {
            console.error("Error during check-in:", error);
            setStatusMessage("Lỗi khi kết nối đến server.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Quét Mã Vạch</h2>
            <BarcodeScanner onScanSuccess={handleScanSuccess} />
            {barcode && <p>Mã đã quét: {barcode}</p>}
            <button
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                }}
                onClick={handleCheckin}
            >
                Check-in
            </button>
            {statusMessage && (
                <p style={{ marginTop: "15px", color: statusMessage.includes("thành công") ? "green" : "red" }}>
                    {statusMessage}
                </p>
            )}
            {checkinDetails && (
                <div style={{ marginTop: "20px", color: "blue" }}>
                    <p>
                        Bạn là người thứ <strong>{checkinDetails.currentCheckins}</strong> trong nhóm{" "}
                        <strong>{checkinDetails.groupName}</strong>.
                    </p>
                    <p>
                        Số người tối đa: <strong>{checkinDetails.maxCheckins}</strong>.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CheckinPage;
