//Create Restaurant

const restaurantModel = require("../models/restaurantModel");

const createRestaurantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //validation
    if (!title || !coords) {
      res.status(500).send({
        success: false,
        message: "title and coordinates are required",
        error,
      });
    }

    const newRestaurant = new restaurantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "new Restaurant is created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restaurant API",
      error,
    });
  }
};

//GET all restaurant
const getAllRestaurantController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(500).send({
        success: false,
        message: "No restaurant available",
        error,
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in GET all  Restaurant API",
      error,
    });
  }
};

const getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id; // Corrected to req.params.id
    console.log("Requested Restaurant ID:", restaurantId);

    // Find restaurant
    const restaurant = await restaurantModel.findById(restaurantId);
    console.log("Retrieved Restaurant:", restaurant);

    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "No restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Restaurant by Id API",
      error,
    });
  }
};

const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Provide Restaurant Id",
      });
    }
    await restaurantModel.findByIdAndDelete(restaurantId);
    res.status(200).send({
      success: true,
      message: "Successfully deleted the restaurant",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete Restaurant by Id API",
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
