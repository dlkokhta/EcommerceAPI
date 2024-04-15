import { Request, Response } from "express";
import addItemModel from "../models/addItemsModel.js";
const getShoesById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id!!!!!", id);
    const shoes = await addItemModel.findOne({ id: id });
    res.send(shoes);
    console.log("shoes!!!!", shoes);
  } catch (error) {
    res.status(400).json(error);
  }
};
export default getShoesById;
