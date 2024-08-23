import { Request, Response } from "express";
import purchasedShoesModel from "../models/purchasedShoesModel";
import addItemModel from "models/addItemsModel";
import cartItemsModel from "models/cartItemsModel";
import { purchaseConfirmationHeader } from "../email/edge.js";

const PurchasedShoes = async (req: Request, res: Response) => {
  const { email, cartItems, totalAmount } = req.body;

  const { itemId, size, quantity } = cartItems[0];

  try {
    let shoes = await addItemModel.findOne({ id: itemId });

    if (!shoes) {
      throw new Error("Shoe not found");
    }

    const findSize = shoes.sizes.find((item: any) => item.size === size);

    if (!findSize) {
      throw new Error("Size not found");
    }

    const sizesQuanty = parseInt(findSize.quantity);

    const recievedQuantity = parseInt(quantity);

    const finalQuantity = sizesQuanty - recievedQuantity;

    if (finalQuantity < 0) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    findSize.quantity = finalQuantity.toString();

    await shoes.save();

    await cartItemsModel.deleteOne({ email: email });

    let purchasedItems = await purchasedShoesModel.findOne({ email: email });

    if (purchasedItems) {
      purchasedItems.cartItems = [...purchasedItems.cartItems, ...cartItems];
      purchasedItems.totalAmount = totalAmount;
      await purchasedItems.save();
    } else {
      purchasedItems = new purchasedShoesModel({
        email: email,
        cartItems: cartItems,
        totalAmount: totalAmount,
      });
      await purchasedItems.save();
    }

    let url;
    if (process.env.NODE_ENV === "production") {
      url = `https://ecommerce-front-end-five.vercel.app`;
    } else {
      url = `http://localhost:5173`;
    }

    await purchaseConfirmationHeader(email, `${url}/purchase`);

    res.status(200).json({ message: "user purchase added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default PurchasedShoes;
