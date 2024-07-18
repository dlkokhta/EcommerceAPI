import { Request, Response } from "express";
import addItemModel from "models/addItemsModel";

const deleteShoesByAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await addItemModel.deleteOne({ id: id });

    res.status(200).json({ message: "Shoe deleted successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default deleteShoesByAdmin;
