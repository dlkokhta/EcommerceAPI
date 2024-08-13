import { Request, Response } from "express";
import purchasedShoesModel from "../models/purchasedShoesModel";

const PurchasedGet = async (_req: Request, res: Response) => {
  try {
    const purchasedShoes = await purchasedShoesModel.find();
    console.log("purchasedShoes", purchasedShoes);
    res.status(200).json(purchasedShoes);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default PurchasedGet;
