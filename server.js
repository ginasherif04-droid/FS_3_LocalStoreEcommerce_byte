require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server running on port ${process.env.PORT || 3000}`
            );
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error.message);
    });