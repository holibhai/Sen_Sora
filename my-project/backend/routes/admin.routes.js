const express = require("express");
const router = express.Router();

// Controller functions
const {
  signup,
  login,
  logout,
} = require("../controller/admin.controller");

// @route   POST /api/admin/signup
// @desc    Register a new admin
router.post("/signup", signup);

// @route   POST /api/admin/login
// @desc    Admin login
router.post("/login", login);

// @route   POST /api/admin/logout
// @desc    Admin logout
router.post("/logout", logout);

module.exports = router;
