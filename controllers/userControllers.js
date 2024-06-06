//GET user info

const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

const getUserController = async (req, res) => {
  try {
    //get user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      res.status(404).status({
        success: false,
        message: "User not found here",
      });
    }

    //hide password
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User get successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting user Api",
    });
  }
};

// Update user
const updateUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });

    //validation
    if (!user) {
      res.status(404).status({
        success: false,
        message: "User not found here",
      });
    }

    //update
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;

    //save user
    await user.save();
    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update user api",
    });
  }
};

//update Password
const updatePasswordController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });

    //validation
    if (!user) {
      res.status(404).status({
        success: false,
        message: "User not found here",
      });
    }

    //get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide old and new password",
      });
    }

    //check user password | compare password

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(500).send({
        success: false,
        message: "Invalid oldPassword",
      });
    }

    //hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password API",
    });
  }
};

//RESET Password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      res.status(500).send({
        success: false,
        message: "User not found or invalid answer",
      });
    }
    //hashing
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Reset password API",
    });
  }
};

//Delete Profile Account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "Your Profile Account has been deleted SuccessfullyI",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Profile section",
      error,
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
