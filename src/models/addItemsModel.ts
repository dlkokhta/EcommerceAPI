import { Schema, model } from "mongoose";
import { addItemsTypes } from "types/addItemsTypes.js";
import { v4 as uuidv4 } from "uuid";

const { String } = Schema.Types;

const sizeSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
});

const addItemShema = new Schema<addItemsTypes>({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  isShoesNew: {
    type: Boolean,
    required: true,
    default: true,
  },
  gender: {
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
    type: [sizeSchema],
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
    default: () => uuidv4(),
  },
});

const addItemModel = model<addItemsTypes>("addItemModel", addItemShema);
export default addItemModel;
