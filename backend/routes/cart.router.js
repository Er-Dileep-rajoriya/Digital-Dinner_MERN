import express from "express";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartItemsByUser,
  removeAllCartItems,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", addToCart);
cartRouter.get("/", getCartItemsByUser);
cartRouter.post("/:id", removeFromCart);
cartRouter.patch("/inc/:id", increaseQuantity);
cartRouter.patch("/dec/:id", decreaseQuantity);
cartRouter.delete('/clear', removeAllCartItems);

export default cartRouter;
