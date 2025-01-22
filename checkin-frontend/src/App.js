import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import CheckinPage from "./components/CheckinPage";
import GroupList from "./components/GroupList"; // Import GroupList
import "./App.css";
import BarcodeScanner from "./components/BarcodeScanner";

const App = () => {
    const [isCheckin, setIsCheckin] = useState(false);

    const startCheckin = () => {
        setIsCheckin(true);
    };

    return (
        <div className="app">
     
            
            {/* Hiển thị LandingPage hoặc CheckinPage dựa trên trạng thái */}
            {isCheckin ? <CheckinPage /> : <LandingPage startCheckin={startCheckin} />}
        </div>
    );
};

export default App;