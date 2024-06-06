const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userControllers");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes GET
router.get("/getUser", authMiddleware, getUserController);

//update profie
router.put("/updateUser", authMiddleware, updateUserController);

//update password
router.post("/updatePassword", authMiddleware, updatePasswordController)

//Reset Password
router.post("/resetPassword", authMiddleware, resetPasswordController)

//delete User
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController )



module.exports = router;
