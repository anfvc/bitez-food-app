import { Schema, model } from "mongoose";

const orderSchema = new Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    default: "Food is Processing",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  address: {
    type: Object,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const Order = model("Order", orderSchema);
export default Order;
