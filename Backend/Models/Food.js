import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    softDeletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

const Food = model("food", foodSchema);

export default Food;
