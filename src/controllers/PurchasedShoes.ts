import { Request, Response } from "express";
import purchasedShoesModel from "../models/purchasedShoesModel";
import addItemModel from "models/addItemsModel";
import cartItemsModel from "models/cartItemsModel";

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

    let cartItem = await purchasedShoesModel.findOne({ email: email });

    await cartItemsModel.deleteOne({ email: email });

    if (cartItem) {
      cartItem.cartItems.push({
        itemId: itemId,
        size: size,
        quantity: quantity,
      });
      await cartItem.save();
    } else {
      cartItem = new purchasedShoesModel({
        email: email,
        cartItems: [
          {
            itemId: itemId,
            size: size,
            quantity: quantity,
          },
        ],
        totalAmount: totalAmount,
      });

      await cartItem.save();
    }
    res.status(200).json({ message: "user purchase added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export default PurchasedShoes;
