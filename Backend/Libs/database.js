import mongoose from "mongoose";

async function connection() {
  mongoose.connection.on("connected", () => {
    console.log("Database has been connected ✅");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Database encountered an error ❌");
  });

  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
}

export default connection;
