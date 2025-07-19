import express from "express";
import connectDB from "./database/db.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRouter.js";
import cors from "cors";

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("home page");
});

app.listen(3000);
