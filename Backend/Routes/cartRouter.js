import express from "express";
import { addToCart, removeFromCart, getCart } from "../Controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart)
router.post("/remove", removeFromCart)
router.post("/get", getCart)

export default router;
