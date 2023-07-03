import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/connectDB.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config;
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`Server is listening on port ${PORT}`);
});
