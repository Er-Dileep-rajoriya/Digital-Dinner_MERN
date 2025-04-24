import { Cart } from "../models/cart.model.js";

// API to add an item to the cart
export const addToCart = async (req, res) => {
  const { itemId, quantity } = req.body;

  const userId = req.userId;

  if (!userId || !itemId || !quantity) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if the item already exists in the user's cart
    let cartItem = await Cart.findOne({ userId, itemId });

    if (cartItem) {
      // If the item exists, update the quantity
      cartItem.quantity += quantity;
    } else {
      // If the item doesn't exist, create a new cart item
      cartItem = new Cart({
        userId,
        itemId,
        quantity,
      });
    }

    // Save the cart item
    await cartItem.save();

    return res.status(200).json({
      message: "Item added to cart successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// API to remove an item from the cart
export const removeFromCart = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.userId;

  if (!userId || !itemId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the cart item and delete it
    const cartItem = await Cart.findOneAndDelete({ userId, itemId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res
      .status(200)
      .json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// API to increase the quantity of an item in the cart
export const increaseQuantity = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.userId;

  if (!userId || !itemId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the cart item
    const cartItem = await Cart.findOne({ userId, itemId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Increase the quantity by 1
    cartItem.quantity += 1;

    // Save the updated cart item
    await cartItem.save();

    return res.status(200).json({
      message: "Quantity increased successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// API to decrease the quantity of an item in the cart
export const decreaseQuantity = async (req, res) => {
  const itemId = req.params.id;
  const userId = req.userId;

  if (!userId || !itemId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the cart item
    const cartItem = await Cart.findOne({ userId, itemId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    // Decrease the quantity by 1, but not below 1
    if (cartItem.quantity > 1) {
      cartItem.quantity -= 1;
    } else {
      return res
        .status(400)
        .json({ message: "Cannot decrease quantity below 1" });
    }

    // Save the updated cart item
    await cartItem.save();

    return res.status(200).json({
      message: "Quantity decreased successfully",
      cartItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// API to get all cart items for a user
export const getCartItemsByUser = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {

    

    const cartItems = await Cart.find({ userId }).populate("itemId");

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No items found in the cart" });
    }

    const formattedItems = cartItems.map((cartItem) => ({
      _id: cartItem.itemId._id,
      title: cartItem.itemId.title,
      category: cartItem.itemId.category,
      description: cartItem.itemId.description,
      price: cartItem.itemId.price,
      imageUrl: cartItem.itemId.imageUrl,
      quantity: cartItem.quantity
    }));

    return res.status(200).json({
      message: "Cart items fetched successfully",
      cartItems : formattedItems,
    });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// api to remove all cart items
export const removeAllCartItems = async (req, res) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(400).json({ message: "Missing userId field" });
  }
  try {
    const cartItems = await Cart.find({ userId });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({ message: "No cart items found" });
    }

    await Cart.deleteMany({ userId });

    return res
      .status(200)
      .json({ message: "All items removed from cart successfully" });
  } catch (error) {
    console.error("Error removing all cart items:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

