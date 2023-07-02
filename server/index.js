import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";

dotenv.config;
await connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) console.log(error);
  console.log(`Server is listening on port ${PORT}`);
});
