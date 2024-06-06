const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { createCatController, getAllCatController, updateCatController, deleteCatController } = require("../controllers/categoryController");


const router = express.Router();

//routes

//create category
router.post("/create", authMiddleware, createCatController)

//GET All CAT
router.get("/getAll", getAllCatController)

//Update route
router.put("/update/:id", authMiddleware, updateCatController)

//Delete route
router.delete("/delete/:id", authMiddleware, deleteCatController)


module.exports = router;
