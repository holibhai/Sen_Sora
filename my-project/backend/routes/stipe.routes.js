const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
require('dotenv').config(); // Load environment variables

const stripe = new Stripe(process.env.STRIPE_KEY); // Correct initialization

router.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000, // $20.00 in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`, // ✅ Fixed template string
      cancel_url: `${process.env.FRONTEND_URL}/cart`,
    });

    res.send({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error);
    res.status(500).send({ error: 'Something went wrong while creating the session' });
  }
});

module.exports = router;
