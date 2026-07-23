import "dotenv/config";
import mongoose from "mongoose";

const dbConnect = process.env.MDB_CONNECTION;

export default async function mdbConnection() {
  try {
    await mongoose.connect(dbConnect);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log({ message: `Failed to connect to DB Error:${err.message}` });
  }
}
