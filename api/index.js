import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import dns from 'dns';
import cookieParser from "cookie-parser"; 
import cors from "cors";

dns.setServers(['8.8.8.8', '8.8.4.4']);
dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
mongoose.connect(process.env.mongo)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log("Connection failed:", err));
app.use(cookieParser())
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
const message = err.message || "Internal Server Error";
return res.status(statusCode).json({ 
  success: false,
  statusCode,
  message });
})