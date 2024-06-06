const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getFoodSingleController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodControllers");
const adminMIddleware = require("../middlewares/adminMIddleware");

const router = express.Router();

//routes

//Create Food
router.post("/create", authMiddleware, createFoodController);

//Get all
router.get("/getAll", getAllFoodsController);

//get single by food id
router.get("/get/:id", getFoodSingleController);

//get single by restaurant
router.get("/getByRestaurant/:id", getFoodByRestaurantController);

//Update food
router.put("/update/:id", authMiddleware, updateFoodController)

//Delete food
router.delete("/delete/:id", authMiddleware, deleteFoodController)

//Place order
router.post('/placeorder', authMiddleware, placeOrderController)

//order status
router.post("/orderStatus/:id", authMiddleware, adminMIddleware,orderStatusController )

module.exports = router;
