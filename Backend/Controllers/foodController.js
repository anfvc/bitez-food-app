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

    console.log(newFood);

    res.status(201).json({
      id: newFood._id,
      name: newFood.name,
      message: "New Food has been created.",
    });
  } catch (error) {
    next(createHttpError(500, "Food could not be added."));
  }
}

export async function getFoods(req, res, next) {
  try {
    const getAllFood = await Food.find({});

    console.log(getAllFood);

    res.status(200).json({
      food: getAllFood,
    });
  } catch (error) {
    next(createHttpError(500, "We could not fetch all the foods."));
  }
}

export async function deleteFood(req, res, next) {
  try {
    const options = {
      new: true,
      runValidators: true,
    };

    const findFood = await Food.findById(req.body.id);

    if (!findFood) {
      return next(createHttpError(404, "Food was not found."));
    }

    if (findFood.softDeletedAt) {
      return res.status(400).json({
        message: `${findFood.name} has already been deleted.`,
      });
    }

    if (!findFood.image) {
      return next(createHttpError(404, "The image was not found."));
    }

    fs.unlink(`Uploads/${findFood.image}`, (error) => {
      if (error) {
        console.error("Error trying to delete the image.", error);
      }
    });

    const softDeletedFood = await Food.findByIdAndUpdate(
      req.body.id,
      {
        softDeletedAt: new Date(),
      },
      options
    );

    if (softDeletedFood) {
      console.log("Food was successfully deleted.", softDeletedFood);
      res.status(200).json({
        message: `${softDeletedFood.name} was successfully deleted.`,
      });
    } else {
      next(createHttpError(404, "Food was not found."));
    }
  } catch (error) {
    next(createHttpError(500, "Server Error."));
  }
}
