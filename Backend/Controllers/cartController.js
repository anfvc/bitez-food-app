import createHttpError from "http-errors";
import User from "../Models/User.js";

export async function addToCart(req, res, next) {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({
      message: "Product added to cart.",
    });
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}

export async function removeFromCart(req, res, next) {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 1) {
      cartData[req.body.itemId] -= 1;
    } else {
      delete cartData[req.body.itemId];
    }

    await User.findByIdAndUpdate(req.body.userId, { cartData });
    res.status(200).json({
      message: "Product removed from cart.",
    });
  } catch (error) {
    console.log("Error occurred:", error);
    next(createHttpError(500, "Server Error"));
  }
}

export async function getCart(req, res) {
  try {
    let userData = await User.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.status(200).json({ cartData });
  } catch (error) {
    next(createHttpError(500, "Server Error"));
  }
}
