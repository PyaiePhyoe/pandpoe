import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongo db successfully!");
  } catch (error) {
    console.error("Could not connect to mongo db", error);
  }
};

export default connectDB;
