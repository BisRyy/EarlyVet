require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (amount, metadata) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe requires amount in cents
      currency: "usd",
      metadata,
    });
    return paymentIntent.client_secret;
  } catch (err) {
    throw new Error(`Failed to create Stripe payment intent: ${err.message}`);
  }
};

module.exports = { createPaymentIntent };
