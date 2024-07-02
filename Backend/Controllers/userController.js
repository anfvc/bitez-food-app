import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import createHttpError from "http-errors";

export async function loginUser(req, res, next) {}

export async function registerUser(req, res, next) {
  const { name, email, password } = req.body;

  let foundUser;

  try {
    foundUser = await User.findOne({ email: email });
  } catch (error) {
    return next(createHttpError(500, "Server Error."));
  }

  if (foundUser) {
    next(createHttpError(409, "This user already exists."));
  } else {
    try {
      const newUser = await User.create({
        name,
        email,
        password,
      });

      console.log(newUser);

      res.status(201).json({
        id: newUser._id,
        name: newUser.name,
        message: `${newUser.name} has been created successfully.`,
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        console.log(error.errors);

        const errorMessage = Object.values(error.errors)[0].message;

        return next(createHttpError(400, errorMessage));
      }
      next(
        createHttpError(
          500,
          "Registration could not be completed. Please try again."
        )
      );
    }
  }
}
