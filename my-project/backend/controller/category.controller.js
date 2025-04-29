const { connection } = require("../db/ConnectMysql");
const { v4: uuidv4 } = require("uuid");

// Create a new category
const createCategory = async (req, res) => {
  const { type, category } = req.body;

  if (!type || !category) {
    return res.status(400).json({ error: "Type and Category are required" });
  }
       
  const categoryId = uuidv4();
   
  const query = `INSERT INTO categories (categoryId, type, category) VALUES (?, ?, ?)`;
  connection.query(query, [categoryId, type, category], (err, result) => {  
    if (err) {
      console.error("Error creating category:", err);  
      return res.status(500).json({ error: "Internal Server Error" }); 
    }
    
    res.status(201).json({
      message: "Category created successfully",
      category: { categoryId, type, category },
    });    
  });
};

// Get all categories
const getAllCategories = async (req, res) => {
  const query = `SELECT * FROM categories`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching categories:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.status(200).json(results);
  });
};

// Get a category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM categories WHERE categoryId = ?`;
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error fetching category:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(results[0]);
  });
};

// Update a category by ID
const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { type, category } = req.body;

  const query = `UPDATE categories SET type = ?, category = ? WHERE categoryId = ?`;
  connection.query(query, [type, category, id], (err, result) => {
    if (err) {
      console.error("Error updating category:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory: { categoryId: id, type, category },
    });
  });
};

// Delete a category by ID
const deleteCategoryById = async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM categories WHERE categoryId = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting category:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted successfully" });
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
};
