import Food from "../Models/Food.js";
import createHttpError from "http-errors";
import fs from "fs";

//* Adding a food item:
export async function addFood(req, res, next) {
  let image_filename = `${req.file.filename}`;
  const { name, description, price, category } = req.body;

  try {
    const newFood = await Food.create({
      name: name,
      description: description,
      price: price,
      category: category,
      image: image_filename,
    });

    console.log("This product has been created:", newFood);

    res.status(201).json({
      id: newFood._id,
      name: newFood.name,
      message: `${name} has been created successfully.`,
    });
  } catch (error) {
    next(createHttpError(500, "Food could not be created."));
  }
}

export async function getFoods(req, res, next) {
  try {
    const getAllFood = await Food.find({});

    console.log(getAllFood);

    res.status(200).json(getAllFood);
  } catch (error) {
    next(createHttpError(500, "We could not fetch all the foods."));
  }
}

export async function deleteFood(req, res, next) {
  try {
    const { id } = req.params;
    const findFood = await Food.findById(id);

    if (!findFood) {
      return next(createHttpError(404, "Food was not found."));
    }

    fs.unlink(`Uploads/${findFood.image}`, (error) => {
      if (error) {
        next(createHttpError(500, "Image could not be deleted."));
      }
    });

    const foodToDelete = await Food.findByIdAndDelete(id);

    if (!foodToDelete) {
      return next(createHttpError(404, "Food was not found"));
    } else {
      res.status(200).json("Food has been successfully removed");
    }
  } catch (error) {
    next(createHttpError(500, "Server Error."));
  }
}
