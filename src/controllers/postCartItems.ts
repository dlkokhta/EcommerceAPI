import { Request, Response } from "express";
import cartItemsModel from "../models/cartItemsModel.js";

const postCartItems = async (req: Request, res: Response) => {
  const { email, id, size } = req.body;
  console.log("req bodyyyy!!", email, id, size);

  try {
    let cartItem = await cartItemsModel.findOne({ email: email });

    if (cartItem) {
      cartItem.cartItems.push(id);
      cartItem.size.push(size);
      await cartItem.save();
    } else {
      cartItem = new cartItemsModel({
        email: email,
        cartItems: [id],
        size: [size],
      });
      await cartItem.save();
    }
    res.status(200).json({ message: "Cart item added successfully" });
  } catch (error) {
    console.error("Error adding cart item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default postCartItems;
