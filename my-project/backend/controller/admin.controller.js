const { connection } = require("../db/ConnectMysql");
const { v4: uuidv4 } = require("uuid");
const bcryptjs = require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");

// =========================
// Admin Signup Controller
// =========================
const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if email already exists
    connection.query("SELECT * FROM admins WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }

      // Hash the password
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);
      const adminId = uuidv4();

      // Insert new admin into database
      const query = `
        INSERT INTO admins (adminId, firstname, lastname, email, password)
        VALUES (?, ?, ?, ?, ?)
      `;
      connection.query(
        query,
        [adminId, firstname, lastname, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Insert error:", err);
            return res.status(500).json({ error: "Failed to create user" });
          }

          const token = generateTokenAndSetCookie(email, res);
          res.status(201).json({
            message: "Admin created successfully",
            admin: { adminId, firstname, lastname, email },
            token,
          });
        }
      );
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// =========================
// Admin Login Controller
// =========================
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    connection.query("SELECT * FROM admins WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const admin = results[0];
      const isPasswordCorrect = await bcryptjs.compare(password, admin.password);

      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const token = generateTokenAndSetCookie(admin.email, res);
      const { password: _, ...adminWithoutPassword } = admin;

      res.status(200).json({
        message: "Logged in successfully",
        admin: adminWithoutPassword,
        token,
      });
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// =========================
// Admin Logout Controller
// =========================
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
