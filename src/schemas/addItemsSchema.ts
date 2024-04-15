import Joi from "joi";
import { addItemsTypes } from "../types/addItemsTypes";

const addItemsSchema = Joi.object<addItemsTypes>({
  brand: Joi.string().min(3).max(15).required(),
  model: Joi.string().min(3).max(50).required(),
  color: Joi.string().min(3).max(15).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().required(),
  sizes: Joi.string().required(),
  availability: Joi.boolean(),
});

export default addItemsSchema;
