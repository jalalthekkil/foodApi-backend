const foodModal = require("../models/foodModal");
const orderModel = require("../models/orderModel");

const createFoodController = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurnat,
      rating,
      ratingCount,
    } = req.body;
    if (!title || !description || !price || !restaurnat) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    const newFood = new foodModal({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurnat,
      rating,
      ratingCount,
    });
    await newFood.save();
    res.status(201).send({
      success: true,
      message: "New food item added successfully",
      newFood,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Create Food Api",
    });
  }
};

//Get all food
const getAllFoodsController = async (req, res) => {
  try {
    const foods = await foodModal.find({});
    if (!foods) {
      return res.status(404).send({
        success: false,
        message: "No food items found ",
      });
    }
    res.status(200).send({
      success: true,
      totalFoods: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get all  Food Api",
    });
  }
};

//get food single

const getFoodSingleController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Please provide with food id",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food with this id found",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get single Food Api",
    });
  }
};

//get food by restaurant

const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide with food id",
      });
    }
    const food = await foodModal.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food with this id found",
      });
    }
    res.status(200).send({
      success: true,
      message: "food based on restaurant",
      food,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in get single Food Api",
    });
  }
};

//Update Food Item
const updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "Food item not found with Id",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found",
      });
    }

    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      catgeory,
      code,
      isAvailabe,
      restaurnat,
      rating,
      ratingCount,
    } = req.body;
    const updatedFood = await foodModal.findByIdAndUpdate(
      foodId,
      {
        title,
        description,
        price,
        imageUrl,
        foodTags,
        catgeory,
        code,
        isAvailabe,
        restaurnat,
        rating,
        ratingCount,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Food item updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Update Food Api",
    });
  }
};

//Delete Food Item
const deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModal.findById(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found on this id",
      });
    }

    await foodModal.findByIdAndDelete(foodId);
    res.status(200).send({
      success: true,
      message: "Food item deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Delete Food Api",
    });
  }
};

//Place Order
const placeOrderController = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please add cart and payment cart",
      });
    }
    let total = 0;

    // calcultion
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });
    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Place order controller",
    });
  }
};

//Change order status
const orderStatusController = async(req, res)=>{
    try {
        const orderId = req.params.id;
        if(!orderId){
            return res.status(404).send({
              success: false,
              message: "Please provide valid order Id",
            });
        }
        const {status} = req.body;
        const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new: true})
        res.status(200).send({
          success: true,
          message: "Order status updated",
        });
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in order status Api",
        });
    }
}

module.exports = {
  createFoodController,
  getAllFoodsController,
  getFoodSingleController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController
};
