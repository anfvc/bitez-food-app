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

app.use(
  cors({
    credentials: true,
    origin: [
      "https://bitez-food-app.onrender.com",
      "http://localhost:5555",
      "http://localhost:5173",
    ],
  })
);

//* Serving Frontend (frontend)
app.use(express.static(path.join(__dirname, "../Frontend/dist"))); //? specify the path for our frontend (current directory + path we want to get in) // deploy-starter/frontend/dist

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "../Frontend/dist", "index.html");
// });

//* Serving admin (frontend)
app.use(express.static(path.join(__dirname, "../admin/dist"))); //? specify the path for our frontend (current directory + path we want to get in) // deploy-starter/frontend/dist

app.get("/admin/*", (req, res) => {
  res.sendFile(__dirname + "../admin/dist", "index.html");
});

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

const folderForUploads =
  process.env.NODE_ENV === "DEVELOPMENT" ? "Uploads" : "Backend/Uploads"; //? Serving the folder for uploading the images dynamically depending on the NODE_ENV

app.use("/images", express.static(folderForUploads)); //* <-- had to add Backend in front of uploads for it to work on prod

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist", "index.html")); //? This route is catching all unmatched routes that I don't have as API routes and it's serving my index.html
});

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});

app.use(globalErrorHandler);
