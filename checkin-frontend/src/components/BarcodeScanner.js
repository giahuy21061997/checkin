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
            fps: 10, // Số khung hình mỗi giây
            qrbox: { width: 400, height: 200 }, // Kích thước vùng quét (dài và thấp cho mã vạch)
        };

        // Bắt đầu scanner
        Html5Qrcode.getCameras()
            .then((cameras) => {
                if (cameras && cameras.length > 0) {
                    let selectedCameraId;

                    // iOS Safari không cung cấp nhãn rõ ràng, buộc chọn camera sau bằng cách chọn camera cuối
                    if (cameras.length > 1) {
                        selectedCameraId = cameras[cameras.length - 1].id; // Chọn camera cuối (thường là camera sau)
                    } else {
                        selectedCameraId = cameras[0].id; // Nếu chỉ có một camera, sử dụng nó
                    }

                    // Khởi động camera
                    html5QrCode
                        .start(
                            selectedCameraId, // Dùng ID camera sau
                            config,
                            (decodedText) => {
                                console.log("Scanned barcode:", decodedText);
                                onScanSuccess(decodedText); // Callback khi scan thành công
                            },
                            (errorMessage) => {
                                console.warn("Scan error:", errorMessage); // Handle scan errors
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
                width: "500px",
                height: "300px",
                margin: "auto",
                border: "2px solid #ccc",
                borderRadius: "10px",
                overflow: "hidden",
            }}
        >
            {/* Khung hiển thị vùng quét */}
           
        </div>
    );
};

export default BarcodeScanner;
