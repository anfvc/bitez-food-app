import express from "express";
import authMiddleware from "../Middleware/authentication.js";
import {
  placeOrder,
  verfyOder,
  userOrders,
  listOrders,
  updateStatusOfOrder,
} from "../Controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.post("/verify", verfyOder);
router.post("/userorders", authMiddleware, userOrders);
router.get("/list", listOrders);
router.post("/status", updateStatusOfOrder);

export default router;
