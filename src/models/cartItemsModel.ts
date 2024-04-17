import { Schema, model } from "mongoose";
import { cartItemsTypes } from "../types/cartItemsTypes";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const cartItemSchema = new Schema({
  itemId: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
});

const cartItemsSchema = new Schema<cartItemsTypes>({
  email: {
    type: String,
    required: true,
  },
  cartItems: {
    type: [cartItemSchema],
    required: true,
  },

  id: {
    type: String,
    required: true,
    default: uuid(),
  },
});

const cartItemsModel = model<cartItemsTypes>("cartItemsModel", cartItemsSchema);
export default cartItemsModel;
