import { Request, Response } from "express";
import cartItemsModel from "../models/cartItemsModel.js";
import addItemModel from "../models/addItemsModel.js";

const postCartItems = async (req: Request, res: Response) => {
  try {
    const { email, cartItems } = req.body;
    const { itemId, size, quantity } = cartItems[0];
    let shoes = await addItemModel.findOne({ id: itemId });

    const findSize = shoes?.sizes.find((item: any) => item.size === size);

    const findQuantityToNumber = Number(findSize?.quantity); //recieved quantity

    if (findQuantityToNumber < quantity) {
      return res.status(400).json({
        message: "available only ",
        findQuantityToNumber,
      });
    }

    let cartItem = await cartItemsModel.findOne({ email: email });

    if (cartItem) {
      cartItem.cartItems.push({
        itemId: itemId,
        size: size,
        quantity: quantity,
      });
      await cartItem.save();
    } else {
      cartItem = new cartItemsModel({
        email: email,
        cartItems: [{ itemId: itemId, size: size, quantity: quantity }],
      });

      await cartItem.save();
    }
    res.status(200).json({
      message: "Cart item added successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default postCartItems;
