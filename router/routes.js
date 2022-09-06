const express = require("express");
const router = express.Router();

const {signup}= require("../controllers/signup");
const {verify}= require("../controllers/verify");
const {signin}= require("../controllers/signin");
const {logout}= require("../controllers/logout");
const {forgotPassword}= require("../controllers/forgotPassword");
const {resetPassword}= require("../controllers/resetPassword");


router.post("/signup", signup);
router.post("/verify", verify);
router.post("/signin", signin);
router.post("/logout", logout);
router.post("/forgotPassword", forgotPassword);
router.post("/resetPassword", resetPassword);



module.exports = router;
