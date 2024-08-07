import { Schema, model } from "mongoose";
import { UserRegistrationTypes } from "types/userRegistrationTypes.js";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const userRegistrationSchema = new Schema<UserRegistrationTypes>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    default: "user",
  },

  id: {
    type: String,
    default: uuid(),
  },

  userVerified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
    default: "",
  },
});

const userRegistrationModel = model<UserRegistrationTypes>(
  "userRegistrationModel",
  userRegistrationSchema
);
export default userRegistrationModel;
