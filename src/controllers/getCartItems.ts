import { Request, Response } from "express";
import cartItemsModel from "models/cartItemsModel";

const getItems = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const items = await cartItemsModel.findOne({ email: email });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default getItems;
