const express = require("express");
require("dotenv").config();

const pool = require("./config/db");

const projectRoutes = require("./routes/project.routes.js");

const taskRoutes = require("./routes/task.routes.js");

const authRoutes = require("./routes/auth.routes.js");


const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("TaskFlow API is running");
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Database connected successfully",
            time: result.rows[0].now
        });

    } catch (error) {
        console.error(error.message);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});