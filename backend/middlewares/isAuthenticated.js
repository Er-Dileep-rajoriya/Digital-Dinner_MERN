import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "kasflkjdhasfsadf";

// Auth middleware to protect routes
export const isAuthenticated = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token not found.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach user ID to the request object
    req.userId = decoded.id;

    next(); // move to next middleware or route handler
  } catch (err) {
    console.error("JWT Error:", err);
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Invalid or expired token.",
    });
  }
};
