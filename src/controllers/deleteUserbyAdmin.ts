import { Request, Response } from "express";
import userRegistrationModel from "../models/userRegistrationModel";

const deleteUserbyAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("iddddd", id);

    await userRegistrationModel.deleteOne({ id: id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json(error);
  }
};

export default deleteUserbyAdmin;
