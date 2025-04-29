const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const { connectToMySql } = require("./db/ConnectMysql");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes=require("./routes/product.routes")

dotenv.config();


// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;


app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));


app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/products",productRoutes)

server.listen(PORT, () => {
	connectToMySql();
	console.log(`Server Running on port ${PORT}`);
});