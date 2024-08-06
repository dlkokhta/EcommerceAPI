import { Schema, model } from "mongoose";
import { purchasedShoesTypes } from "../types/purchasedShoesTypes";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const items = new Schema({
  itemId: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: String, required: true },
});

const purchasedShoesSchema = new Schema<purchasedShoesTypes>({
  email: {
    type: String,
    required: true,
  },
  cartItems: {
    type: [items],
    required: true,
  },

  id: {
    type: String,
    required: true,
    default: uuid(),
  },
});

const purchasedShoesModel = model<purchasedShoesTypes>(
  "purchasedShoesModel",
  purchasedShoesSchema
);
export default purchasedShoesModel;
