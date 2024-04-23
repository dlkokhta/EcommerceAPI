import { Request, Response } from "express";
import cartItemsModel from "models/cartItemsModel";

const getItems = async (_req: Request, res: Response) => {
  try {
    const items = await cartItemsModel.find();
    console.log("items!!!!", items);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default getItems;
