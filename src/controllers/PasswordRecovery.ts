import { Request, Response } from "express";
import userRegistrationModel from "models/userRegistrationModel";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import { recoveryHeader } from "../email/edge";

const PasswordRecovery = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // const { user } = req;

    // if (!user || user.email !== email) {
    //   return res
    //     .status(403)
    //     .send({ error: "Unauthorized to recover this password" });
    // }

    const findUser = await userRegistrationModel.findOne({ email: email });

    if (!findUser) {
      return res.status(400).send({ error: "Email not found" });
    }

    const randomString = CryptoJS.lib.WordArray.random(9).toString(
      CryptoJS.enc.Hex
    );
    console.log("password", randomString);
    const hashedPassword = await bcrypt.hash(randomString, 10);
    findUser.password = hashedPassword;
    await findUser.save();
    await recoveryHeader(
      findUser.email,
      findUser.name,
      `Your new password is: ${randomString}`
    );

    res.send({ message: "A new password has been sent to your email" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while processing your request" });
  }
};

export default PasswordRecovery;
