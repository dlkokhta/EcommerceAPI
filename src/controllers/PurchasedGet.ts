import { Request, Response } from "express";
import purchasedShoesModel from "../models/purchasedShoesModel";

const PurchasedGet = async (_req: Request, res: Response) => {
  try {
    const purchasedShoes = await purchasedShoesModel.find();

    res.send(purchasedShoes);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default PurchasedGet;
