const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const { connectToMySql } = require("./db/ConnectMysql");
const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");
const trackerRoutes=require("./routes/tracker.routes");
const productRoutes=require("./routes/product.routes");
const categoryRoutes = require("./routes/category.routes");
const cartRoutes=require("./routes/cartItem.routes");
const deliveryCostRoutes=require("./routes/deliveyCost.routes");
const orderRoutes=require("./routes/order.routes");
const stripeRoutes=require("./routes/stripe.routes")
const orderItemRoutes=require("./routes/orderItem.routes");
const deliveryRoutes=require("./routes/delivery.routes");
const { createUsersTable } = require("./model/userModel");
const { createAdminsTable } = require("./model/adminModel");
const cors = require("cors");
const { createCategoriesTable }=require("./model/categoryModel");
const { createProductsTable } = require("./model/productModel");
const {  
	createCartItemsTable

} = require("./model/cartItemModel");

const { createDeliveryCostTable } = require("./model/deliveryCostModel");
const {createOrdersTable} = require("./model/orderModel");
const { createOrderItemsTable } =require("./model/orderItemModel");
const {createShippingTable} = require("./model/deliveryModel");
const {createTrackerTable} = require("./model/trackerModel");
// const {createAdminsTable} = require("./model/adminModel");
            

dotenv.config();

const app = express();
// PORT should be assigned after calling dotenv.config() because we need to access the env variables. Didn't realize while recording the video. Sorry for the confusion.
const PORT = process.env.PORT || 5000;

app.use(cors({
	origin: "http://localhost:3000",  // Replace with your frontend's origin
	credentials: true                // Allow cookies to be sent
  })); 


app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

app.use("/api/stripe", stripeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/products",productRoutes)
app.use("/api/categories", categoryRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/deliveryCost",deliveryCostRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/orderItem",orderItemRoutes);
app.use("/api/delivery",deliveryRoutes);
app.use("/api/tracker",trackerRoutes);
// app.use("/api/admin",deliveryRoutes);



app.listen(PORT, () => {
	connectToMySql();
	createUsersTable();
	createAdminsTable();
	createCategoriesTable();
	createProductsTable();
	createCartItemsTable();
	createDeliveryCostTable();
	createOrdersTable();
	createOrderItemsTable();
	createShippingTable();
	createTrackerTable();
	console.log(`Server Running on port ${PORT}`); 
});