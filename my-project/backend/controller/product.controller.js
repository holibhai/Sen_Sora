const { connection } = require("../db/ConnectMysql");




// Create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, type, category, flavor, price, description, stock } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

              // MySQL query to insert a new product
              const query = `
              INSERT INTO products 
              (name, type, category, flavor, price, description, imageUrl, stock)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          `;
          
          const values = [name, type, category, flavor, price, description, imageUrl, stock];
 // Execute the query
           connection.query(query, values, (error, results) => {
           if (error) {
      return res.status(400).json({ message: error.message });
           }

  // Fetch the newly created product to return it
  connection.query('SELECT * FROM products WHERE id = ?', [results.insertId], (err, product) => {
      if (err) {
          return res.status(400).json({ message: err.message });
      }
      res.status(201).json(product[0]);
  });
});
}  catch (error) {
      res.status(400).json({ message: error.message });
    }
  };




  // Get all products
exports.getAllProducts = async (req, res) => {
    try {
        // MySQL query to get all products
        const query = 'SELECT * FROM products';
        
        connection.query(query, (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            res.json(results);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
  // Get a product by ID
  exports.getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const query = 'SELECT * FROM products WHERE id = ?';
        
        connection.query(query, [productId], (error, results) => {
            if (error) {
                return res.status(500).json({ message: error.message });
            }
            if (results.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(results[0]);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
  
  // Update a product by ID
  exports.updateProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, type, category, flavor, price, description, stock } = req.body;
        
        // Handle file upload if present
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : undefined;

        // Build the update query dynamically based on provided fields
        let updateFields = [];
        let values = [];
        
        if (name !== undefined) {
            updateFields.push('name = ?');
            values.push(name);
        }
        if (type !== undefined) {
            updateFields.push('type = ?');
            values.push(type);
        }
        if (category !== undefined) {
            updateFields.push('category = ?');
            values.push(category);
        }
        if (flavor !== undefined) {
            updateFields.push('flavor = ?');
            values.push(flavor);
        }
        if (price !== undefined) {
            updateFields.push('price = ?');
            values.push(price);
        }
        if (description !== undefined) {
            updateFields.push('description = ?');
            values.push(description);
        }
        if (stock !== undefined) {
            updateFields.push('stock = ?');
            values.push(stock);
        }
        if (imageUrl !== undefined) {
            updateFields.push('imageUrl = ?');
            values.push(imageUrl);
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ message: 'No valid fields provided for update' });
        }

        values.push(productId); // Add ID for WHERE clause

        const query = `
            UPDATE products 
            SET ${updateFields.join(', ')}
            WHERE id = ?
        `;

        connection.query(query, values, (error, results) => {
            if (error) {
                return res.status(400).json({ message: error.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            // Fetch the updated product to return it
            connection.query('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.json(product[0]);
            });
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
  
  // Delete a product by ID
  exports.deleteProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        
        // First, get the product to check if it exists (optional)
        const checkQuery = 'SELECT * FROM products WHERE id = ?';
        
        connection.query(checkQuery, [productId], (checkError, checkResults) => {
            if (checkError) {
                return res.status(500).json({ message: checkError.message });
            }
            
            if (checkResults.length === 0) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            // Product exists, proceed with deletion
            const deleteQuery = 'DELETE FROM products WHERE id = ?';
            
            connection.query(deleteQuery, [productId], (deleteError, deleteResults) => {
                if (deleteError) {
                    return res.status(500).json({ message: deleteError.message });
                }
                
                if (deleteResults.affectedRows === 0) {
                    // This shouldn't happen since we checked first, but just in case
                    return res.status(404).json({ message: 'Product not found' });
                }
                
                res.json({ 
                    message: 'Product deleted successfully',
                    deletedProduct: checkResults[0] // Optional: return the deleted product data
                });
            });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

  
