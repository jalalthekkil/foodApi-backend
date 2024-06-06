const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken")

const registerController = async (req, res) => {
  try {
    const { userName, email, phone, password, address,answer } = req.body;
    //validation
    if (!userName || !email || !phone || !password || !address || !answer) {
      res.status(500).send({
        success: false,
        message: "All fields are requied",
      });
    }
    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Email already registered please Login",
      });
    }

    //hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Register API",
    });
  }
};

//Login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }

    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found ",
      });
    }

    //check user password | compare password

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid password or credential",
      });
    }

    const token = JWT.sign({id: user._id}, process.env.JWT_SECRET,{
      expiresIn: "7d"
    })

    user.password = undefined;


    res.status(200).send({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in Login API",
      error,
    });
  }
};

module.exports = { registerController, loginController };
