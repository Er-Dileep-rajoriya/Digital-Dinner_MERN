import { prisma } from "../lib/prisma.config.js";

export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, phoneNumber } = req.body;
    const userId = req.userId;

    console.log("api called.");

    if (!items || !totalAmount || !phoneNumber) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = await prisma.Order.create({
      data: {
        items,
        totalAmount,
        phoneNumber,
        userId,
      },
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getOrderHistoryByUser = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID" });
    }

    const orders = await prisma.Order.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    if (orders.length === 0) {
      return res.status(404).json({ message: "No orders found for user" });
    }

    res.status(200).json({
      message: "Order history fetched successfully",
      orders,
    });
  } catch (err) {
    console.error("Error fetching user order history:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
