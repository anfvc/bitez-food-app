import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import createHttpError from "http-errors";
import validator from "validator";

export async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (foundUser) {
      const matchPasswords = await compare(password, foundUser.password);

      //* If password does not match, let's throw a warning:
      if (!matchPasswords) {
        return next(createHttpError(400, "Wrong password! Please try again."));
      }

      const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15min",
      });

      console.log(`${foundUser} has logged in with token: ${token}`);
      res.status(200).json({
        id: foundUser._id,
        message: `${foundUser.name} has logged in`,
        token,
      });
    } else {
      //* If the user is not found, let's throw a warning:

      return next(createHttpError(404, "User does not exist"));
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = Object.values(error.errors)[0].message;
      console.log(errorMessage);

      return next(createHttpError(400, errorMessage));
    }

    return next(createHttpError(500, "Login failed"));
  }
}

export async function registerUser(req, res, next) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createHttpError(400, "All fields are required"));
  }

  // *Validating password before hashing:

  const isStrongPassword = validator.isStrongPassword(password);

  if (!isStrongPassword) {
    return next(
      createHttpError(
        400,
        "Password must contain at least 8 characters, including at least 1 lowercase character, 1 uppercase character, 1 number and 1 symbol"
      )
    );
  }

  try {
    const foundUser = await User.findOne({ email: email });

    // ? If the user is found, it means, it already exists, send a warning message:
    if (!foundUser) {
      const hashedPassword = await hash(password, 10);

      //* If the user does not exist, let's create the new user:

      const newUser = await User.create({
        name: name[0].toUpperCase() + name.slice(1),
        email: email,
        password: hashedPassword,
      });

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15min",
      });

      res.status(200).json({
        id: newUser._id,
        name: newUser.name,
        token,
        message: `${newUser.name} has successfully signed up`,
      });
    } else {
      return next(
        createHttpError(
          409,
          "This user email already exists. Please try a different one."
        )
      );
    }
  } catch (error) {
    //*Send a message if the registration proccess failed:
    if (error.name === "ValidationError") {
      console.log("Validation Error: ", error.errors);

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
