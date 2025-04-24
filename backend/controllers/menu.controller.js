import { redisClient } from "../lib/redis.config.js";
import { Menu } from "../models/menu.model.js";
// get all menu items
export const getMenuItems = async (req, res) => {
  try {

    // check in caching of redis
    const dataPresent = await redisClient.get('Items');

    if(dataPresent)
    {
      return res.status(200).json({
        success: true,
        Items: JSON.parse(dataPresent),
      });
    }


    const menuItems = await Menu.find();

    if (!menuItems || menuItems.length <= 0) {
      return res.status(404).json({
        success: false,
        message: "Items Not Found",
      });
    }

    // set items to redis for future caching
    await redisClient.set('Items', JSON.stringify(menuItems));
    await redisClient.expire('Items', 5000);

    return res.status(200).json({
      success: true,
      Items: menuItems,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// add menu items
export const addItem = async (req, res) => {
  try {
    const { title, price, description, category, imageUrl } = req.body;

    console.log("BOdy : ", req.body);

    // imageUrl is optional field

    if (
      !title ||
      title.trim() == "" ||
      !price ||
      !description ||
      description.trim() == "" ||
      !category ||
      category.trim() == ""
    ) {
      return req.status(400).json({
        success: false,
        message: "Something is Missing.",
      });
    }

    if (price <= 0) {
      return req.status(400).json({
        success: false,
        message: "Price must be greater than Zero.",
      });
    }

    if (typeof price == "NaN") {
      return res.status(400).json({
        success: false,
        message: "Price must be Number.",
      });
    }

    const newItem = Menu.create({
      title,
      description,
      price,
      imageUrl,
      category,
    });

    if (!newItem) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Item successfully added.",
      item: newItem,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
