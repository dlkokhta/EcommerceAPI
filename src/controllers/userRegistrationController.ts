import userRegistrationModel from "models/userRegistrationModel";
import { Request, Response } from "express";


const userRegistrationController = async (req: Request, res: Response) => {
    try{
        const { name, email, password,  } = req.body;

        // if(password !== )

        const newUser = new userRegistrationModel({ name, email, password });
        newUser.save();
        return res.status(201).json("user registered succesfully");
    }catch(error ){
        return res.status(401).json(error);
    }
}

export default userRegistrationController;