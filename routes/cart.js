const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// Get the current cart
router.get("/:sessionId", async (req, res) => {
    try {
        let cart = await Cart.findOne({
            sessionId: req.params.sessionId
        }).populate("items.productId");

        if (!cart) {
            cart = await Cart.create({
                sessionId: req.params.sessionId,
                items: []
            });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get cart",
            error: error.message
        });
    }
});

// Add product to cart
router.post("/:sessionId/add", async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required"
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const requestedQuantity = quantity || 1;

        if (requestedQuantity < 1) {
            return res.status(400).json({
                message: "Quantity must be at least 1"
            });
        }

        let cart = await Cart.findOne({
            sessionId: req.params.sessionId
        });

        if (!cart) {
            cart = new Cart({
                sessionId: req.params.sessionId,
                items: []
            });
        }

        const existingItem = cart.items.find(
            item => item.productId.toString() === productId
        );

        const currentQuantity = existingItem
            ? existingItem.quantity
            : 0;

        if (currentQuantity + requestedQuantity > product.stock) {
            return res.status(400).json({
                message: "Not enough stock available"
            });
        }

        if (existingItem) {
            existingItem.quantity += requestedQuantity;
        } else {
            cart.items.push({
                productId,
                quantity: requestedQuantity
            });
        }

        await cart.save();

        const updatedCart = await Cart.findOne({
            sessionId: req.params.sessionId
        }).populate("items.productId");

        res.status(200).json({
            message: "Product added to cart",
            cart: updatedCart
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to add product to cart",
            error: error.message
        });
    }
});

// Remove product from cart
router.delete("/:sessionId/remove/:productId", async (req, res) => {
    try {
        const cart = await Cart.findOne({
            sessionId: req.params.sessionId
        });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found"
            });
        }

        const originalLength = cart.items.length;

        cart.items = cart.items.filter(
            item => item.productId.toString() !== req.params.productId
        );

        if (cart.items.length === originalLength) {
            return res.status(404).json({
                message: "Product not found in cart"
            });
        }

        await cart.save();

        const updatedCart = await Cart.findOne({
            sessionId: req.params.sessionId
        }).populate("items.productId");

        res.status(200).json({
            message: "Product removed from cart",
            cart: updatedCart
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to remove product from cart",
            error: error.message
        });
    }
});

module.exports = router;