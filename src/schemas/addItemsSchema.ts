import Joi from "joi";
import { addItemsTypes } from "../types/addItemsTypes";

const addItemsSchema = Joi.object<addItemsTypes>({
  brand: Joi.string().min(3).max(15).required(),
  model: Joi.string().min(3).max(15).required(),
  color: Joi.string().min(3).max(15).required(),
  description: Joi.string().min(3).max(30).required(),
  price: Joi.number().required(),
  // sizes: Joi.array().items(Joi.string()).required(),
  availability: Joi.boolean().required(),
  // image: Joi.string().required(),
});

export default addItemsSchema;
