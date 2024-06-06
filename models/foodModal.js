const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is required"],
    },
    description: {
      type: String,
      required: [true, " food description is required"],
    },
    price: {
      type: Number,
      required: [true, "food price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "data:image/jpeg;base64,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",
    },
    foodTags: {
      type: String,
    },
    catgeory: {
      type: String,
    },
    code: {
      type: String,
    },

    isAvailabe: {
      type: Boolean,
      default: true,
    },
    resturnat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Foods", foodSchema);