const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (username, res) => {

  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "15d",  // Set token expiry to 15 days
  });

  // Set the token as a cookie in the response
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,  // Cookie expiry time (15 days in milliseconds)
    httpOnly: true,   // Makes cookie inaccessible via JavaScript for security
    sameSite: "strict",  // Helps prevent CSRF attacks
    secure: process.env.NODE_ENV !== "development",  // Secure cookie for production environments
  });

  return token;

};

module.exports = generateTokenAndSetCookie;
