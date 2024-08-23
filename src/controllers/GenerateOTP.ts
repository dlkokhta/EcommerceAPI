import { Request, Response } from "express";
import userRegistrationModel from "models/userRegistrationModel";
import CryptoJS from "crypto-js";
import { otpHeader } from "../email/edge";

const GenerateOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const findUser = await userRegistrationModel.findOne({ email: email });

    if (!findUser) {
      return res.status(400).send({ message: "Email not found" });
    }

    const otp = CryptoJS.lib.WordArray.random(6).toString(CryptoJS.enc.Hex);

    findUser.otp = otp;
    await findUser.save();

    await otpHeader(findUser.email, findUser.name, ` ${otp}`);
    return res.status(200).send({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred while generating the OTP",
    });
  }
};

export default GenerateOTP;
