import { Request, Response } from "express";
import addItemModel from "../models/addItemsModel.js";

const getAllShoes = async (_: Request, res: Response) => {
  try {
    const allShoes = await addItemModel.find();
    console.log("allShoes", allShoes);
    // res.send(allShoes);
    res.status(200).json(allShoes);
  } catch (error) {
    res.status(400).json(error);
  }
};
export default getAllShoes;
