const express=require("express")
const router = express.Router();
const upload=require("../middlewares/upload");
// const { signup } = require("../controller/auth.controller");
const { addToCart, getCartItems, updateCartItem,incrementQuantity,decrementQuantity,removeFromCart, clearCart, checkout } = require("../controller/cartItem.controller");

// Apply authentication middleware to all cart routes
// router.use(signup); 

// Add item to cart
router.post('/add', addToCart);

// Get user's cart items
router.get('/:userId', getCartItems);

// Update cart item quantity
// router.put('/:id',updateCartItem);

router.put('/increment/:id',incrementQuantity);

router.put('/decrement/:id',decrementQuantity);


// Remove item from cart
router.delete('/:id',removeFromCart);

// Clear user's cart
router.delete('/clear', clearCart);

// Checkout cart and create order
router.post('/checkout', checkout);


module.exports=router