const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controller/category.controller");

const router = express.Router();

const { getCategories } = require("../model/categoryModel");




// Route to create a new category
router.post("/add", createCategory);
 
router.get("/getAll", getAllCategories);

// Route to get a category by ID
router.get("/:id", getCategoryById);

// Route to update a category by ID
router.put("/:id", updateCategoryById);

// Route to delete a category by ID
router.delete("/:id", deleteCategoryById);

module.exports = router;  
