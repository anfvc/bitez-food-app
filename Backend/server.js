import express from "express";
import cors from "cors";
import connection from "./Libs/database.js";
import foodRouter from "./Routes/foodRouter.js";
import { globalErrorHandler } from "./ErrorHandler/globalErrorHandler.js";
import userRouter from "./Routes/userRouter.js";
import cartRouter from "./Routes/cartRouter.js";

await connection();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/food", foodRouter);

app.use("/api/user", userRouter);

app.use("/api/cart", cartRouter);

app.use("/images", express.static("Uploads"));

app.use(globalErrorHandler);

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
