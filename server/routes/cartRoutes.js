const express = require("express");
const Cart = require("../models/Cart");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Add to Cart
router.post("/add", authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity <= 0) return res.status(400).json({ error: "Invalid input" });

    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [{ productId, quantity }] });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === productId);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Fetch Cart Items
router.get("/", authenticate, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
    if (!cart) return res.status(200).json({ items: [] });

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Remove Item from Cart
router.delete("/remove/:productId", authenticate, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ error: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
    await cart.save();

    res.json({ message: "Item removed from cart", cart });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Update Item Quantity
router.put("/update", authenticate, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ error: "Cart not found" });

    const item = cart.items.find(item => item.productId.toString() === productId);
    if (!item) return res.status(404).json({ error: "Item not found in cart" });

    item.quantity = quantity;
    await cart.save();

    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
