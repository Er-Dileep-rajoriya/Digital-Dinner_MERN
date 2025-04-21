import { prisma } from "../lib/prisma.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "kasflkjdhasfsadf";

// Sign up the user
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      name.trim() === "" ||
      !email ||
      email.trim() === "" ||
      !password ||
      password.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const existingUser = await prisma.User.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login the user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    const user = await prisma.User.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Create token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });

    // Send token as cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Logout the user
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
