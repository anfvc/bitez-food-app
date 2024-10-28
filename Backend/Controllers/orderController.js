import createHttpError from "http-errors";
import Order from "../Models/Order.js";
import User from "../Models/User.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//* To place an order for the frontend:
export async function placeOrder(req, res, next) {
  console.log("Request received: ", req.body);
  const { userId, items, amount, address } = req.body;

  const frontendUrl = process.env.NODE_ENV === "DEVELOPMENT" ? "http://localhost:5173" : "https://bitez-food-app.onrender.com";

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
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.status(200).json({
      session_url: session.url,
    });
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}

export async function verifyOder(req, res, next) {
  const { orderId, success } = req.body;

  try {
    if (success == "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      res.status(200).json({
        message: `Order ${orderId} has been successfully paid.`,
      });
    } else {
      await Order.findByIdAndDelete(orderId);
      next(createHttpError(500, "Payment has failed."));
    }
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}

//* User orders for frontend:

export async function userOrders(req, res, next) {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ userId });
    res.status(200).json({
      orders,
    });
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}

//* Listing all orders for the admin panel:

export async function listOrders(req, res, next) {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}

//* API for updating the status of the order:

export async function updateStatusOfOrder(req, res, next) {
  const { orderId } = req.body;
  try {
    await Order.findByIdAndUpdate(orderId, {
      status: req.body.status,
    });

    res.status(200).json({
      message: `We have successfully updated the status of order: ${orderId}`,
    });
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}
