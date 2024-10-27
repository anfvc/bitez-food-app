import express from "express";
import cors from "cors";
import connection from "./Libs/database.js";
import foodRouter from "./Routes/foodRouter.js";
import { globalErrorHandler } from "./ErrorHandler/globalErrorHandler.js";
import userRouter from "./Routes/userRouter.js";
import cartRouter from "./Routes/cartRouter.js";
import orderRouter from "./Routes/orderRouter.js";
import { fileURLToPath } from "url";
import path from "path";

await connection();

const app = express();

const __filename = fileURLToPath(import.meta.url); // absolute path to the current file
const __dirname = path.dirname(__filename); // directory name of the current file

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: ["https://bitez-food-app.onrender.com", "http://localhost:5555"]
}));

//* Serving Frontend (frontend)
app.use(express.static(path.join(__dirname, "../Frontend/dist"))); //? specify the path for our frontend (current directory + path we want to get in) // deploy-starter/frontend/dist

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../Frontend/dist", "index.html");
});

//* Serving admin (frontend)
app.use(express.static(path.join(__dirname, "admin/dist"))); //? specify the path for our frontend (current directory + path we want to get in) // deploy-starter/frontend/dist

app.get("/admin/*", (req, res) => {
  res.sendFile(__dirname + "../admin/dist", "index.html");
});

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images", express.static("Backend/Uploads")); //* <-- had to add Backend in front of uploads for it to work on prod

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});

app.use(globalErrorHandler);
