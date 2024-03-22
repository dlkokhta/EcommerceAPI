import { Schema, model } from "mongoose";
import { UserRegistrationTypes } from "types/userRegistrationTypes.js";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const userRegistrationSchema = new Schema<UserRegistrationTypes>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    },
    id: {
        type: String,
        default: uuid()
    }
});

const userRegistrationModel = model<UserRegistrationTypes>("userRegistrationModel", userRegistrationSchema);
export default userRegistrationModel