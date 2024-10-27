import express from "express";
import authMiddleware from "../Middleware/authentication.js";
import {
  placeOrder,
  verifyOder,
  userOrders,
  listOrders,
  updateStatusOfOrder,
} from "../Controllers/orderController.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/verify", verifyOder); //? adding this for debugging
router.post("/verify", verifyOder); //? corrected typo
router.post("/userorders", authMiddleware, userOrders);
router.get("/list", listOrders);
router.post("/status", updateStatusOfOrder);

export default router;
