import addItemModel from "models/addItemsModel";
import { Request, Response } from "express";
import addItemsSchema from "schemas/addItemsSchema";

const addItemsController = async (req: Request, res: Response) => {
  const { files, body } = req;

  try {
    const validator = addItemsSchema.validate(body);

    const { error } = validator;

    if (error) {
      return res.status(401).json(error.details);
    }

    // Create an array to store image filenames
    const imageFilenames = [];

    // If files is an array (multiple images)
    if (Array.isArray(files)) {
      files.forEach((file) => {
        // Save the filename to the array
        imageFilenames.push(file.filename);
      });
    } else if (files) {
      // If files is not an array (single image)
      imageFilenames.push(files.filename);
    }

    // Create a new item with the image filenames
    const newItem = new addItemModel({
      ...body,
      sizes: body.sizes.split(","),
      image: imageFilenames,
      availability: true,
    });

    // Save the item to the database
    await newItem.save();

    // Return a success response
    return res.status(200).json({ message: "Item added successfully" });
  } catch (err) {
    // Handle any errors (e.g., database connection error, save failure)
    console.error("Error saving item:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default addItemsController;
