const Product = require('../model/productModel');



// Create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, type, category, flavor, price, description, stock } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
      const product = new Product({
        name,
        type,
        category,
        flavor,
        price,
        description,
        stock,
        imageUrl
      });
  
      const savedProduct = await product.save();
      res.status(201).json(savedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  // Get all products
  exports.getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Get a product by ID
  exports.getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) return res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Update a product by ID
  exports.updateProductById = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  // Delete a product by ID
  exports.deleteProductById = async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  
