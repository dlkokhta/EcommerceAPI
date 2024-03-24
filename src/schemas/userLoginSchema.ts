import Joi from "joi";
import { userLoginTypes } from "../types/userLoginTypes";

const userLoginSchema = Joi.object<userLoginTypes>({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
});

export default userLoginSchema;
