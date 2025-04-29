const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controller/category.controller");

const router = express.Router();

// Route to create a new category
router.post("/add", createCategory);

// Route to get all categories
router.get("/", getAllCategories);

// Route to get a category by ID
router.get("/:id", getCategoryById);

// Route to update a category by ID
router.put("/:id", updateCategoryById);

// Route to delete a category by ID
router.delete("/:id", deleteCategoryById);

module.exports = router;
