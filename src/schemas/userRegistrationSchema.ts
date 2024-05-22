import Joi, { CustomHelpers } from "joi";
import { newUserTypes } from "types/newUserTypes";
import userRegistrationModel from "models/userRegistrationModel";
import { UserRegistrationTypes } from "types/userRegistrationTypes";

const ifUserExist =
  (user: UserRegistrationTypes | null) =>
  (value: string, helpers: CustomHelpers) => {
    if (user) {
      return helpers.error("email already exist!");
    }
    return value;
  };

const userRegistrationSchema = async (data: newUserTypes) => {
  const user = await userRegistrationModel.findOne({ email: data.email });

  return Joi.object<newUserTypes>({
    name: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().custom(ifUserExist(user)).required(),
    password: Joi.string().min(8).max(15).required(),
    repeatPassword: Joi.string().min(8).max(15).required(),
    role: Joi.string().valid("user", "admin").required(),
  });
};

export default userRegistrationSchema;
