const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../model/userSchema");
const userOTPVerification = require("../model/userOTPVerification");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.sendOTP = async ({ _id, email} ,  res) => {
  try {
    
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for registration",
      text: `Your OTP is ${otp}`,
    };

    //hash the OTP
    const hashOTP = await bcrypt.hash(otp.toString(), 10);
    const newOTPVerfication = new userOTPVerification({
      userId: _id,
      otp: hashOTP,
      createdAt: Date.now(),
      expiresAt: Date.now() + 5 * 60000, // 5 minutes
    });
      await newOTPVerfication.save();
      
    // await transporter.sendMail(mailOptions, (err, data) => {
    //     if (err) {
    //     console.log("Error Occurs", err);
    //     res.status(500).json({ error: err });
    //     } else {
    //     console.log("Email sent!!!");
    //     res.status(200).json({ message: "OTP sent to your email" });
    //     }
    // });


    res.json({
      status: "PENDING",
      message: "OTP sent to your email",
      data: { userId: _id, email: email },
    });
  } catch (error) {
    console.log(error);
    res.json({
      error: "Something went wrong",
    });
  }
};
