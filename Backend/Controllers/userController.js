import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import createHttpError from "http-errors";
import createTokenForNewUser from "../Middleware/token.js";

export async function loginUser(req, res, next) {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    //* If the user is not found, let's throw a warning:
    if (!foundUser) {
      return next(createHttpError(404, "User does not exist"));
    }

    //? Let's compare the passwords:
    const isMatch = await compare(password, foundUser.password);

    //* If password does not match, let's throw a warning:
    if (!isMatch) {
      return next(
        createHttpError(401, "Invalid Credentials. Please try again.")
      );
    }

    const token = jwt.sign({ id: foundUser.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    console.log(`${foundUser} has logged in with token: ${token}`);

    res.status(201).json({
      id: foundUser._id,
      message: `${foundUser.email} has successfully logged in.`,
      token: token,
    });
  } catch (error) {
    return next(createHttpError(500, "Server Error"));
  }
}

export async function registerUser(req, res, next) {
  const { name, email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email: email });

    // ? If the user is found, it means, it already exists, send a warning message:
    if (foundUser) {
      return next(
        createHttpError(
          409,
          "This user email already exists. Please try a different one."
        )
      );
    }

    //? If the user does not exist, proceed to create a new user with a hashed password for security:

    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(newUser);

    const token = createTokenForNewUser(newUser._id);

    res.status(200).json({
      id: newUser._id,
      name: newUser.name,
      message: `${newUser.name} has been created successfully.`,
      token: token,
    });
  } catch (error) {
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
