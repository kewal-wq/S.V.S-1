import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import customerRoutes from "./routes/customer.js";
import vendorRoutes from "./routes/vendor.js";
import mongoose from "mongoose";
dotenv.config();

const app = express();
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database connected!");
  })
  .catch((error) => console.log("Something went wrong", error.message));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("This is my home route!");
});

app.use("/customers", customerRoutes);
app.use("/vendors", vendorRoutes);

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
