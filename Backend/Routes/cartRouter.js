import express from "express";
import { addToCart, removeFromCart, getCart } from "../Controllers/cartController.js";
import authMiddleware from "../Middleware/authentication.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart)
router.post("/remove", authMiddleware, removeFromCart)
router.post("/get", authMiddleware, getCart)

export default router;
