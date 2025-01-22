const fs = require("fs");
require("dotenv").config();
console.log("Database Config:");
console.log({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");
const https = require("https");

const app = express();
app.use(bodyParser.json());

// Cho phép frontend trên localhost:3000 truy cập API
app.use(cors({
    origin: "https://192.168.2.10:3000", // Cho phép frontend truy cập
    credentials: true,
}));

// Thêm HTTPS server
const sslOptions = {
    key: fs.readFileSync("./ssl/key.pem"), // Đường dẫn tới private key
    cert: fs.readFileSync("./ssl/cert.pem"), // Đường dẫn tới certificate
};

// Kết nối database
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

app.post("/checkin", async (req, res) => {
    const { barcode } = req.body;

    try {
        const groupQuery = await pool.query(
            "SELECT * FROM Groups WHERE barcode = $1",
            [barcode]
        );

        if (groupQuery.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Invalid barcode" });
        }

        const group = groupQuery.rows[0];

        if (group.current_checkins >= group.max_checkins) {
            return res.status(400).json({ success: false, message: "Group is full" });
        }

        // Cập nhật số lượng check-ins
        const updatedCheckins = group.current_checkins + 1;

        await pool.query(
            "UPDATE Groups SET current_checkins = $1 WHERE id = $2",
            [updatedCheckins, group.id]
        );

        return res.status(200).json({
            success: true,
            message: "Check-in successful",
            groupName: group.name,
            currentCheckins: updatedCheckins,
            maxCheckins: group.max_checkins,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
// API lấy danh sách groups
app.get("/groups", async (req, res) => {
    try {
        const groups = await pool.query("SELECT * FROM Groups");
        res.status(200).json(groups.rows);
    } catch (err) {
        console.error("Error fetching groups:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

// Khởi chạy HTTPS server
https.createServer(sslOptions, app).listen(5000, "192.168.2.10", () => {
    console.log("HTTPS Server running at https://192.168.2.10:5000");
});
