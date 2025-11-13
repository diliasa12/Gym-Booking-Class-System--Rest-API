import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const mongoseConnect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("Connected");
    })
    .catch(() => {
      console.log("Failed");
    });
};

export default mongoseConnect;
