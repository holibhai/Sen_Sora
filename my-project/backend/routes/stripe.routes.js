const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();
// const upload=require("../middlewares/upload")

// const stripe = new Stripe(process.env.STRIPE_KEY);
const stripe = require('stripe')('');
router.post("/add", async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products found" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image], // Stripe expects an array of image URLs
        },
        unit_amount: product.price*100, // Convert dollars to cents
      },
      quantity: product.quantity,
    }));

    console.log("Line items:", lineItems); // Debug log to check the items

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/failure`,
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});


module.exports = router;
