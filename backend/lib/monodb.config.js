import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db_url = process.env.MONGODB_URL;

async function ConnectToDB() {
  try {
    mongoose.connect(db_url, {
        dbName : 'Digital-Dinner'
    });
    console.log("Successfully Connected to MONGODB");
  } catch (err) {
    console.log("Error in Connecting DB : ", err);
  }
}

export default ConnectToDB;
