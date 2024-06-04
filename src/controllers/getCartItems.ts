import { Request, Response } from "express";
import cartItemsModel from "models/cartItemsModel";

const getItems = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    // console.log("req.Paramss email", email);

    const items = await cartItemsModel.findOne({ email: email });
    res.send(items);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default getItems;
