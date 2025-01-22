import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = ({ onScanSuccess }) => {
    const scannerId = "html5qr-code-scanner"; // ID của container scanner
    const [error, setError] = useState(null);
    const scannerRef = useRef(null);

    useEffect(() => {
        const html5QrCode = new Html5Qrcode(scannerId);
        scannerRef.current = html5QrCode;

        const config = {
            fps: 30, // Số khung hình mỗi giây
            qrbox: { width: 300, height: 100 }, // Kích thước vùng quét (dài và thấp cho mã vạch)
        };

        // Bắt đầu scanner
        Html5Qrcode.getCameras()
            .then((devices) => {
                if (devices && devices.length > 0) {
                    html5QrCode
                        .start(
                            devices[0].id, // Chọn camera đầu tiên
                            config,
                            (decodedText) => {
                                console.log("Scanned barcode:", decodedText);
                                onScanSuccess(decodedText); // Callback khi quét thành công
                            },
                            (errorMessage) => {
                                console.warn("Scan error:", errorMessage); // In lỗi nếu cần
                            }
                        )
                        .catch((err) => {
                            console.error("Unable to start scanner:", err);
                            setError("Không thể khởi động camera.");
                        });
                } else {
                    setError("Không tìm thấy camera nào.");
                }
            })
            .catch((err) => {
                console.error("Error fetching cameras:", err);
                setError("Không thể truy cập camera.");
            });

        return () => {
            if (scannerRef.current.isScanning) {
                scannerRef.current
                    .stop()
                    .then(() => console.log("Scanner stopped"))
                    .catch((err) => console.error("Error stopping scanner:", err));
            }
        };
    }, [onScanSuccess]);

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div
            id={scannerId}
            style={{
                position: "relative",
                width: "400px",
                height: "300px",
                margin: "auto",
                border: "2px solid #ccc",
                borderRadius: "10px",
                overflow: "hidden",
            }}
        >
            {/* Khung hiển thị vùng quét */}
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "300px", // Chiều rộng khung
                    height: "100px", // Chiều cao khung
                    border: "2px dashed #007bff",
                    boxSizing: "border-box",
                }}
            ></div>
        </div>
    );
};

export default BarcodeScanner;
