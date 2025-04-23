const CartItem = require('../models/cartItem');
const Product = require('../models/product');
const Order = require('../models/order');
const OrderItem = require('../models/orderItem');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if item already in cart
    let cartItem = await CartItem.findOne({ userId, product: productId });

    if (cartItem) {
      // Update quantity if item exists
      cartItem.quantity += quantity || 1;
    } else {
      // Create new cart item
      cartItem = new CartItem({
        userId,
        product: productId,
        quantity: quantity || 1,
        price: product.price
      });
    }

    await cartItem.save();
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user's cart items
exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await CartItem.find({ userId }).populate('product');
    
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItemId = req.params.id;
    const userId = req.user._id;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cartItem = await CartItem.findOne({ _id: cartItemId, userId });
    if (!cartItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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