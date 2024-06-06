const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createRestaurantController, getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController } = require("../controllers/restaurantControllers");

const router = express.Router();

//routes 

//create restaurant
router.post("/create", authMiddleware, createRestaurantController)

//GET all restaurants || GET
router.get("/getAll",  getAllRestaurantController)

//GET Restaurant by Id
router.get("/get/:id", getRestaurantByIdController)

//Delete Restaurnt by id
router.delete("/delete/:id", authMiddleware, deleteRestaurantController)

module.exports = router;
