import express from "express";
import {
  placeOrder,
  getOrderHistoryByUser,
} from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/order", placeOrder);
orderRouter.post("/order/history", getOrderHistoryByUser);

export default orderRouter;
