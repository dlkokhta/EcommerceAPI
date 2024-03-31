import { Schema, model } from "mongoose";
import { addItemsTypes } from "types/addItemsTypes.js";
import { v4 as uuid } from "uuid";

const { String } = Schema.Types;

const addItemShema = new Schema<addItemsTypes>({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sizes: {
    type: [String],
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
    default: true,
  },
  image: {
    type: [String],
    required: true,
  },

  id: {
    type: String,
    required: true,
    default: uuid(),
  },
});

const addItemModel = model<addItemsTypes>("addItemModel", addItemShema);
export default addItemModel;
