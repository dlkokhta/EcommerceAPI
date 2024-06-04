import { Request, Response } from "express";
import cartItemsModel from "models/cartItemsModel";

const DeleteShoes = async (req: Request, res: Response) => {
  try {
    const { email, itemId } = req.params;

    const findUser = await cartItemsModel.findOne({ email: email });

    if (findUser) {
      // Filter out the item with the specified itemId
      findUser.cartItems = findUser.cartItems.filter(
        (item) => item.itemId !== itemId
      );

      findUser.save();
    }

    res.send(findUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default DeleteShoes;
