import { Request, Response } from "express";
import userRegistrationModel from "../models/userRegistrationModel";

const UsersListForAdminPanel = async (_req: Request, res: Response) => {
  try {
    const getUsers = await userRegistrationModel.find();
    res.status(200).json(getUsers);
  } catch (error) {
    res.status(400).json(error);
  }
};

export default UsersListForAdminPanel;
