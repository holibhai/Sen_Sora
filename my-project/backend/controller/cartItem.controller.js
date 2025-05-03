// const CartItem = require('../model/cartItem');
// const Product = require('../model/product');
// const Order = require('../model/order');
// const OrderItem = require('../model/orderItem');

const { connection } = require("../db/ConnectMysql");


// Add item to cart
 


exports.addToCart = (req, res) => {
  
  try {
    const { productId, userId, quantity, price } = req.body;

    if (!userId || !productId || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // First, check if the product is already in the user's cart
    const checkQuery = `
      SELECT id, quantity FROM cart_items
      WHERE userId = ? AND productId = ?;
    `;

    connection.query(checkQuery, [userId, productId], (checkErr, results) => {
      if (checkErr) {
        console.error("Error checking cart item:", checkErr);
        return res.status(500).json({ message: "Failed to check cart item." });
      }

      if (results.length > 0) {
        // Item exists, update quantity and price
        const existingItemId = results[0].id;
        const newQuantity = results[0].quantity + quantity;

        const updateQuery = `
          UPDATE cart_items
          SET quantity = ?, price = ?
          WHERE id = ?;
        `;

        connection.query(updateQuery, [newQuantity, price, existingItemId], (updateErr) => {
          if (updateErr) {
            console.error("Error updating cart item:", updateErr);
            return res.status(500).json({ message: "Failed to update cart item." });
          }

          res.status(200).json({ message: "Cart item updated successfully.", id: existingItemId });
        });

      } else {
        // Item doesn't exist, insert new row
        const insertQuery = `
          INSERT INTO cart_items (userId, productId, quantity, price)
          VALUES (?, ?, ?, ?);
        `;

        connection.query(insertQuery, [userId, productId, quantity, price], (insertErr, insertResult) => {
          if (insertErr) {
            console.error("Error inserting cart item:", insertErr);
            return res.status(500).json({ message: "Failed to add item to cart." });
          }

          res.status(200).json({ message: "Item added to cart successfully.", id: insertResult.insertId });
        });
      }
    });

  } catch (error) {
    console.error("Unexpected error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};



    
    
 

 


exports.getCartItems = (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT 
      ci.*, 
      p.name AS productName, 
      p.price AS productPrice, 
      p.imageUrl 
    FROM cart_items ci
    JOIN products p ON ci.productId = p.id
    WHERE ci.userId = ?;
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching cart items:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    res.status(200).json(results);
  });
};


// Update cart item quantity
// exports.updateCartItem = async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const cartItemId = req.params.id;
//     const userId = req.user._id;

//     if (!quantity || quantity < 1) {
//       return res.status(400).json({ message: 'Invalid quantity' });
//     }

//     const cartItem = await CartItem.findOne({ _id: cartItemId, userId });
//     if (!cartItem) {
//       return res.status(404).json({ message: 'Cart item not found' });
//     }

//     cartItem.quantity = quantity;
//     await cartItem.save();

//     res.status(200).json(cartItem);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.incrementQuantity = (req, res) => {
  const cartId = req.params.id;

  const query = "UPDATE  cart_items SET quantity = quantity + 1 WHERE id = ?";

  connection.query(query, [cartId], (err, result) => {
    if (err) {
      console.error("Error updating product quantity:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product quantity updated successfully" });
  });
};

exports.decrementQuantity = (req, res) => {
  const cartId = req.params.id;

  const query = `
    UPDATE cart_items 
    SET quantity = quantity - 1 
    WHERE id = ? AND quantity > 1
  `;

  connection.query(query, [cartId], (err, result) => {
    if (err) {
      console.error("Error updating product quantity:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Cannot decrement quantity below 1 or product not found" });
    }

    res.status(200).json({ message: "Product quantity decremented successfully" });
  });
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const userId = req.user._id;

    const cartItem = await CartItem.findOneAndDelete({ _id: cartItemId, userId });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear user's cart
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user._id;
    await CartItem.deleteMany({ userId });
    
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Checkout cart and create order
exports.checkout = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's cart items
    const cartItems = await CartItem.find({ userId }).populate('product');
    if (cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Create order
    const order = new Order({
      orderId: `ORD-${Date.now()}`,
      total,
      userId,
      price: total,
      status: 'pending'
    });

    // Create order items and add to order
    const orderItems = await Promise.all(cartItems.map(async (item) => {
      const orderItem = new OrderItem({
        orderId: order._id,
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
        userId
      });
      await orderItem.save();
      return orderItem._id;
    }));

    order.items = orderItems;
    await order.save();

    // Clear cart
    await CartItem.deleteMany({ userId });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};