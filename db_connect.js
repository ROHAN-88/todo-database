import mongoose from "mongoose";

export const db_connect = async () => {
  const db_url = process.env.DATABASE;
  try {
    await mongoose.connect(db_url);
    console.log("Database Connection : OK");
  } catch (e) {
    console.log(e.message);
  }
};
