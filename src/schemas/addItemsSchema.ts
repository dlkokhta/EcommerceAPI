import Joi from "joi";
import { addItemsTypes } from "../types/addItemsTypes";

const addItemsSchema = Joi.object<addItemsTypes>({
  brand: Joi.string().min(3).max(15).required(),
  model: Joi.string().min(3).max(50).required(),
  gender: Joi.string().min(3).max(15).required(),
  color: Joi.string().min(3).max(15).required(),
  description: Joi.string().min(3).required(),
  price: Joi.number().required(),
  sizes: Joi.array()
    .items(
      Joi.object({
        size: Joi.string().required(),
        quantity: Joi.string().min(0).required(),
      })
    )
    .required(),
  image: Joi.string(),
  id: Joi.string(),
  // availability: Joi.boolean(),
});

export default addItemsSchema;
