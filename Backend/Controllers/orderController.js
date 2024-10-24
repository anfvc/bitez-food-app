import createHttpError from "http-errors";
import Order from "../Models/Order.js";
import User from "../Models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//* To place an order for the frontend:
async function placeOrder(req, res) {
  const { userId, items, amount, address } = req.body;

  const frontendUrl = "http://localhost:5173";

  try {
    const newOrder = await Order.create({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
    });

    await newOrder.save();
    //* We need to clear the user's cart:
    await User.findByIdAndUpdate(userId, { cartData: {} });

    //* Creating the line items for stripe to process payment:
    const line_items = items.map((item) => ({
      price_data: {
        currency: "EUR",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, //? Converting EUR to cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "EUR",
        product_data: {
          name: "Delivery Fees",
        },
        unit_amount: 5 * 100, //? 5€ delivery * 100 to convert to cents
      },
      quantity: 1,
    });

    //* Create a session:

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
       //? if payment successful, we are redirected to this page after payment
      success_url: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
    });

    res.status(200).json({
      session_url: session.url
    })
  } catch (error) {
    next(createHttpError(500, "Server Error"))
  }
}

export default placeOrder;
