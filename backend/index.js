import express from "express";
import dotenv from "dotenv";
import itemRouter from "./routes/item.router.js";
import ConnectToDB from "./lib/monodb.config.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.router.js";
import cartRouter from "./routes/cart.router.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.js";
import orderRouter from "./routes/order.route.js";
dotenv.config();

const PORT = process.env.PORT || 3100;

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use("/api/menu", itemRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", isAuthenticated, cartRouter);
app.use("/api/items", isAuthenticated, orderRouter);

app.listen(PORT, () => {
  console.log("Server is Successfully Running on port : ", PORT);
  ConnectToDB();
});
