const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "https://checkin-frontend.onrender.com" })); // Thay bằng URL frontend trên Render

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// API xử lý check-in
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

        await pool.query(
            "UPDATE Groups SET current_checkins = current_checkins + 1 WHERE id = $1",
            [group.id]
        );

        return res.status(200).json({
            success: true,
            message: `Check-in successful! You are person number ${
                group.current_checkins + 1
            } in ${group.group_name}.`,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// Khởi chạy server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
