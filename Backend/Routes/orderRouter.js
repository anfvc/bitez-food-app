import express from "express";
import authMiddleware from "../Middleware/authentication.js";
import placeOrder from "../Controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);

export default router;
