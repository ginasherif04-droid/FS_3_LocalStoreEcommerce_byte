require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        await Product.deleteMany({});

        const products = [
            {
                name: "Classic Tote Bag",
                price: 850,
                description: "A simple everyday tote bag with a spacious interior.",
                image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
                stock: 12
            },
            {
                name: "Minimal Watch",
                price: 1450,
                description: "A clean and elegant watch designed for everyday wear.",
                image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
                stock: 8
            },
            {
                name: "Leather Wallet",
                price: 650,
                description: "Compact leather wallet with multiple card slots.",
                image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600",
                stock: 15
            },
            {
                name: "Everyday Sneakers",
                price: 2200,
                description: "Comfortable everyday sneakers with a minimal design.",
                image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
                stock: 6
            },
            {
                name: "Ceramic Coffee Mug",
                price: 320,
                description: "Minimal ceramic mug perfect for coffee or tea.",
                image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600",
                stock: 20
            },
            {
                name: "Scented Candle",
                price: 480,
                description: "A warm scented candle designed for a relaxing atmosphere.",
                image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600",
                stock: 10
            }
        ];

        await Product.insertMany(products);

        console.log("Sample products added successfully!");

        await mongoose.connection.close();
    } catch (error) {
        console.error("Failed to seed products:");
        console.error(error.message);
    }
};

seedProducts();