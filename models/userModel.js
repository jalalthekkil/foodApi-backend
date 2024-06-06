const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: [true, "phone number is required"],
    },
    usertype: {
      type: String,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: String,
      default:
        "https://www.google.com/imgres?q=user%20image&imgurl=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2020%2F07%2F01%2F12%2F58%2Ficon-5359553_1280.png&imgrefurl=https%3A%2F%2Fpixabay.com%2Fillustrations%2Ficon-user-male-avatar-business-5359553%2F&docid=u9EZShJE4IdRWM&tbnid=tV2S8z0k2PPDeM&vet=12ahUKEwib0J_yxOyFAxWqb_UHHTJxCNEQM3oECHsQAA..i&w=1280&h=1280&hcb=2&ved=2ahUKEwib0J_yxOyFAxWqb_UHHTJxCNEQM3oECHsQAA",
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("User", userSchema);
