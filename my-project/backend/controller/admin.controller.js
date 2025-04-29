const { connection } = require("../db/ConnectMysql");
const bcryptjs=require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateToken");


// Signup
const signup = async (req, res) => {
    try {
      const { firstName, lastName, username, password, confirmPassword } = req.body;
  
      // Check if passwords match
      if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match" });
      }
  
      // Check if username already exists
      connection.query(
        "SELECT * FROM admins WHERE username = ?",
        [username],
        async (err, results) => {
          if (err) {
            return res.status(500).json({ error: "Internal Server Error" });
          }
  
          if (results.length > 0) {
            return res.status(400).json({ error: "Username already exists" });
          }
  
          // Hash the password
          const salt = await bcryptjs.genSalt(10);
          const hashedPassword = await bcryptjs.hash(password, salt);
  
          // Insert new user into the database
          const query = `INSERT INTO admins (firstName, lastName, username, password) VALUES (?, ?, ?, ?)`;
          connection.query(query, [firstName, lastName, username, hashedPassword], (err, result) => {
            if (err) {
              return res.status(500).json({ error: "Failed to create user" });
            }
  
            const newAdmin = { firstName, lastName, username };
            generateTokenAndSetCookie(newUser.username, res); // You can pass the username or userId
  
            res.status(201).json({ message: "User created successfully", user: newAdmin });
          });
        }
      );
    } catch (error) {
      console.log("Error in signup controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Query to get user from MySQL database by username
      connection.query("SELECT * FROM admins WHERE username = ?", [username], async (err, results) => {
        if (err) {
          console.log("Error querying database", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }
  
        if (results.length === 0) {
          // User not found
          return res.status(400).json({ error: "Invalid username or password" });
        }
  
        const user = results[0];
  
        // Compare the hashed password with the one in the database
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
  
        if (!isPasswordCorrect) {
          return res.status(400).json({ error: "Invalid username or password" });
        }
  
        // Generate JWT token and set it in the cookie
        generateTokenAndSetCookie(user.username, res); // You can use `user.username` or `user.id` based on your setup
  
        // Respond with the user data excluding the password
        const { password: _, ...userWithoutPassword } = user;
        res.status(200).json(userWithoutPassword);
      });
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  


  const logout = async (req, res) => {
    try {
      // Clear the jwt cookie by setting maxAge to 0 and path to '/'
      res.cookie("jwt", "", {
        maxAge: 0, // Cookie is immediately expired
        path: "/", // Cookie applies to all routes
        httpOnly: true, // Cookie cannot be accessed via JavaScript
        sameSite: "strict", // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV !== "development", // Ensure the cookie is secure in production
      });
  
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };




module.exports={
    signup,login,logout
}