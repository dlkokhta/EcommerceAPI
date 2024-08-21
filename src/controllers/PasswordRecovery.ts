import { Request, Response } from "express";
import userRegistrationModel from "models/userRegistrationModel";
import CryptoJS from "crypto-js";
import bcrypt from "bcrypt";
import { recoveryHeader } from "../email/edge";

const PasswordRecovery = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    // const { user } = req;

    // if (!user || user.email !== email) {
    //   return res
    //     .status(403)
    //     .send({ error: "Unauthorized to recover this password" });
    // }

    const findUserOTP = await userRegistrationModel.findOne({ otp: otp });

    if (!findUserOTP) {
      return res.status(400).send({ message: "wrong otp" });
    }

    if (findUserOTP.otp === otp) {
      const randomString = CryptoJS.lib.WordArray.random(7).toString(
        CryptoJS.enc.Hex
      );

      const hashedPassword = await bcrypt.hash(randomString, 10);
      findUserOTP.password = hashedPassword;
      findUserOTP.otp = "";
      await findUserOTP.save();
      await recoveryHeader(
        findUserOTP.email,
        findUserOTP.name,
        `Your new password is: ${randomString}`
      );
    }

    res.send({ message: "A new password has been sent to your email" });
  } catch (error) {
    return res
      .status(500)
      .send({ error: "An error occurred while processing your request" });
  }
};

export default PasswordRecovery;
