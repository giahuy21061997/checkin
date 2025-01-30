import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import CheckinPage from "./components/CheckinPage";
import GroupStats from "./components/GroupStats";
import "./App.css";

const App = () => {
    const [currentPage, setCurrentPage] = useState("landing"); // State điều hướng trang

    return (
        <div className="app">
            {currentPage === "landing" && <LandingPage startCheckin={() => setCurrentPage("checkin")} showStats={() => setCurrentPage("stats")} />}
            {currentPage === "checkin" && <CheckinPage goBack={() => setCurrentPage("landing")} />}
            {currentPage === "stats" && <GroupStats goBack={() => setCurrentPage("landing")} />}
        </div>
    );
};

export default App;
