import { Schema, model } from "mongoose";
import { userverifyTypes } from "types/userverifyTypes.js";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const userRegistrationSchema = new Schema<userverifyTypes>({
  email: {
    type: String,
    required: true,
  },
  randomString: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: () => uuid(),
  },
});

const userverifyModel = model<userverifyTypes>(
  "userverifyModel",
  userRegistrationSchema
);
export default userverifyModel;
