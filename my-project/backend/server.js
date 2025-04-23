const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const connectToMongoDb = require("./db/connectToMongoDb");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

dotenv.config();


// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;


app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes)

server.listen(PORT, () => {
	connectToMongoDb();
	console.log(`Server Running on port ${PORT}`);
});