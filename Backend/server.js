import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5555;

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});