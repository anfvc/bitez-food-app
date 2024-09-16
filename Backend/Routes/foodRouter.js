import express from "express";
import { addFood, getFoods, deleteFood } from "../Controllers/foodController.js";
import multer from "multer";

const router = express.Router();

//Image storage Engine:

const storage = multer.diskStorage({
  destination: "Uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()} ${file.originalname}`); //Filename is unique with Date.now()
  },
});

const upload = multer({ storage: storage });

router.post("/add", upload.single("image"), addFood);
router.get("/list", getFoods);
router.delete("/delete/:id", deleteFood)

export default router;
