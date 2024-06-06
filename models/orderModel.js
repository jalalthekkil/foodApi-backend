const mongoose = require("mongoose");

//schema
const ordersSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Foods",
      },
    ],
    payments: {},
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["preparing", "prepared", "ontheway", "delivered"],
      default: 'preparing'
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Orders", ordersSchema);
