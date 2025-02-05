import React, { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

const BarcodeScanner = ({ onScanSuccess }) => {
    const scannerId = "html5qr-code-scanner"; 
    const [error, setError] = useState(null);
    const scannerRef = useRef(null);
    const isScanning = useRef(false); // 🔴 Thêm biến kiểm tra trạng thái scanner

    useEffect(() => {
        const html5QrCode = new Html5Qrcode(scannerId);
        scannerRef.current = html5QrCode;

        const config = {
            fps: 10,
            qrbox: { width: 300, height: 400 },
        };

        Html5Qrcode.getCameras()
            .then((cameras) => {
                if (cameras.length > 0) {
                    let selectedCameraId = cameras.length > 1 ? cameras[cameras.length - 1].id : cameras[0].id;

                    // 🔴 Tránh chạy scanner nhiều lần
                    if (!isScanning.current) {
                        isScanning.current = true;

                        html5QrCode
                            .start(
                                selectedCameraId,
                                config,
                                (decodedText) => {
                                    console.log("Scanned barcode:", decodedText);
                                    onScanSuccess(decodedText);
                                },
                                (errorMessage) => console.warn("Scan error:", errorMessage)
                            )
                            .catch((err) => {
                                console.error("Unable to start scanner:", err);
                                setError("Không thể khởi động camera.");
                            });
                    }
                } else {
                    setError("Không tìm thấy camera nào.");
                }
            })
            .catch((err) => {
                console.error("Error fetching cameras:", err);
                setError("Không thể truy cập camera.");
            });

        return () => {
            if (scannerRef.current && isScanning.current) {
                isScanning.current = false;
                scannerRef.current.stop().catch((err) => console.error("Error stopping scanner:", err));
                scannerRef.current = null;
            }
        };
    }, [onScanSuccess]);

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return <div id={scannerId} style={{ width: "500px", height: "600px", margin: "auto" }}></div>;
};

export default BarcodeScanner;
