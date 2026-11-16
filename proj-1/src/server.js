const express = require("express");
require("dotenv").config();

const app = express();

app.use(express.json());

const userRoutes = require("../routes/user.routes.js");

app.use("/api/users", userRoutes);

app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
});