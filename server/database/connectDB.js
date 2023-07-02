import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGODB_URI;

const connectDB = async () => {
  await mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongoDB");
    })
    .catch((error) => {
      console.log("error connecting to mongoDB", error);
    });
};

export default connectDB;
