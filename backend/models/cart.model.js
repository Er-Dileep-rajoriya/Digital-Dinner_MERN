import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Menu", // Reference to the Menu collection where product details are stored
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Create a model using the schema
export const Cart = mongoose.model("Cart", cartSchema);
