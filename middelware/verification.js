const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const userOTPVerification = require("../model/userOTPVerification");


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

const sendOTPVerification = async ({ _id, email }, res) => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000);
      console.log("OPT ", otp);
  
      const mailOption = {
        from: process.env.EMAIL,
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}`,
      };
  
      //hash the OTP
      const hashOTP = await bcrypt.hash(otp.toString(), 10);
      const newOTPVerfication = new userOTPVerification({
        userId: _id,
        otp: hashOTP,
        createdAt: Date.now(),
        expiresAt: Date.now() + 5 * 60000 // 5 minutes
      });
  
  
      await newOTPVerfication.save();
    //   await transporter.sendMail(mailOption);
  
      res.json({ status :"PENDING" , message: "OTP sent to your email" , data:{userId: _id, email: email} });
      
    } catch (error) {
      console.log(error);
      res.json({
        error: "Something went wrong",
      })
  
      
    }
  
   
  
}
  

module.exports =  sendOTPVerification;