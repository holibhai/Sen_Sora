const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
require("dotenv").config();

// const stripe = new Stripe(process.env.STRIPE_KEY);
const stripe = require('stripe')('');
router.post("/add", async (req, res) => {
  try {
    const { products, shippingCost } = req.body;  // Receive both products and shippingCost from frontend

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "No products found" });
    }

    // Create line items for Stripe Checkout session
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          images: [product.image], // Stripe expects an array of image URLs
        },
        unit_amount: Math.round(product.price * 100), // Convert dollars to cents
      },
      quantity: product.quantity,
    }));

    // Add shipping cost as a separate line item (if applicable)
    if (shippingCost && shippingCost > 0) {
      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: "Shipping Cost", // Name of the shipping item
          },
          unit_amount: Math.round(shippingCost * 100), // Convert shipping cost to cents
        },
        quantity: 1,  // Only 1 unit of shipping cost
      });
    }

    // Create a new Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],  
      line_items: lineItems,  
      mode: "payment",  
      success_url: `${process.env.FRONTEND_URL}/success`,  
      cancel_url: `${process.env.FRONTEND_URL}/failure`,  
    });

    // Respond with the session id, which the frontend uses to redirect to Stripe checkout
    res.json({ id: session.id });

  } catch (error) {
    console.error("Stripe session creation error:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});


module.exports = router;
