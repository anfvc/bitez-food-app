import express from "express";
import {
  addFood,
  getFoods,
  deleteFood,
} from "../Controllers/foodController.js";
import upload from "../Middleware/multer.js";

const router = express.Router();

router.post("/add", upload.single("image"), addFood);
router.get("/list", getFoods);
router.delete("/delete/:id", deleteFood);

export default router;
