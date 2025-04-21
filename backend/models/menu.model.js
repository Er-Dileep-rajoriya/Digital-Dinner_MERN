import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Appetizers", "Main Courses", "Desserts", "Drinks", "Others"],
    default: "Others",
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
});


export const Menu = mongoose.model("Menu", menuSchema);
