const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controller/category.controller");

const router = express.Router();
const { getCategories } = require("../models/categoryModel");


// Route to create a new category
router.post("/", createCategory);

// Route to get all categories
router.get("/categories", (req, res) => {
  getCategories((err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Transform flat result to nested structure
    const grouped = results.reduce((acc, { type, category }) => {
      if (!acc[type]) acc[type] = [];
      acc[type].push(category);
      return acc;
    }, {});
    
    const formatted = Object.entries(grouped).map(([name, subcategories]) => ({
      name,
      subcategories
    }));

    res.json(formatted);
  });
});

// Route to get a category by ID
router.get("/:id", getCategoryById);

// Route to update a category by ID
router.put("/:id", updateCategoryById);

// Route to delete a category by ID
router.delete("/:id", deleteCategoryById);

module.exports = router;
