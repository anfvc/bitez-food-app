import { Schema, model } from "mongoose";
import validator from "validator";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [4, "Name must be minimum 4 characters long."],
      maxLength: [25, "Name must be maximum 25 characters long."]
    },
    email: {
      type: String,
      required: true,
      unique: true,
      vaidate: {
        validator: function(value) {
          return validator.isEmail(value); //* Checking if provided email is valid.
        },
        message: "Email is not in a correct format. Please check."
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return validator.isStrongPassword(value, {minLength: 5})
        },
        message: "Password must be min. 5 characters, have a lowercase, a uppercase, a number and a special character."
      }
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { versionKey: false, minimize: false }
);

const User = model("User", userSchema);

export default User;
