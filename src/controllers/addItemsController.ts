import addItemModel from "models/addItemsModel";
import { Request, Response } from "express";
import addItemsSchema from "schemas/addItemsSchema";

const addItemsController = async (req: Request, res: Response) => {
  try {
    const { files, body } = req;

    const sizesString = body.sizes;

    const sizes = JSON.parse(`[${sizesString}]`);

    const validator = addItemsSchema.validate({ ...body, sizes });

    const { error } = validator;

    if (error) {
      return res.status(401).json(error.details);
    }

    const imageFilenames = [];

    if (Array.isArray(files)) {
      files.forEach((file) => {
        imageFilenames.push(file.filename);
      });
    } else if (files) {
      imageFilenames.push(files.filename);
    }

    const newItem = new addItemModel({
      ...body,
      sizes: sizes,
      image: imageFilenames,
      availability: true,
    });

    await newItem.save();

    return res.status(200).json({ message: "Item added successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default addItemsController;
