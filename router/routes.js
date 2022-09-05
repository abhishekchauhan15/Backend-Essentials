const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../middelware/authenticate");
const sendOTPVerification = require("../middelware/verification");
const userOTPVerification = require("../model/userOTPVerification");

const User = require("../model/userSchema");

const {signup}= require("../controllers/signup");
const {verify}= require("../controllers/verify");
const {signin}= require("../controllers/signin");
const {logout}= require("../controllers/logout");
const {forgotPassword}= require("../controllers/forgotPassword");


router.post("/signup", signup);
router.post("/verify", verify);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);



router.post("/resendOTPVerification", async (req, res) => {

  try {
    const { userId, email } = req.body;
    
    if (!userId || !email) {
      return res.status(422).json({ error: "Please fill all the fields" });
    } else {
      //delete the previous otp
      await userOTPVerification.deleteOne({ userId });
      //send new otp
      sendOTPVerification({ _id: userId, email: email }, res);

    }

    
  } catch (error) {
    console.log(error)
    res.send(error, "Something went wrong");
    
  }
  
})


//-----------------------------------------------------------

//refresh token
router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "No token" });

  try {
    const verifyToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const accessToken = jwt.sign({ verifyToken }, process.env.JWT_SECRET, {
      expiresIn: "5min",
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid token" });
  }
});

module.exports = router;
