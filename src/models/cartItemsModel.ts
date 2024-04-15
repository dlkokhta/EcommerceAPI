import { Schema, model } from "mongoose";
import { cartItemsTypes } from "../types/cartItemsTypes";

const { String } = Schema.Types;

const cartItemsSchema = new Schema<cartItemsTypes>({
  email: {
    type: String,
    required: true,
  },
  cartItems: {
    type: [String],
    required: true,
    default: [],
  },
});

const cartItemsModel = model<cartItemsTypes>("cartItemsModel", cartItemsSchema);
export default cartItemsModel;
