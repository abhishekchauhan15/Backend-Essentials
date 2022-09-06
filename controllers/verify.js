const userOTPVerification = require("../model/userOTPVerification");
const bcrypt = require("bcrypt");
const user = require("../model/userSchema");


exports.verify = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const userLogin = await userOTPVerification.findOne({ userId });
    if (userLogin) {
      const expiresAt = userLogin.expiresAt;
      const validOTP = await bcrypt.compare(otp, userLogin.otp);

      const exp = expiresAt > Date.now();
      // console.log(exp);

      if (validOTP && exp) {
        const result = await user.updateOne({ _id: userId }, { $set: { isVerifed: true } });
        // console.log(result);
        await userOTPVerification.deleteOne({ userId });
        console.log("OTP verified and deleted");
        res.status(201).json({
          message: "VERIFIED & User registered successfully",
          dataSaved: user,
        });
      } else {
        res.json({ status: "wFAILED", message: "Invalid OTP" });
      }
    } else {
      res.json({ status: "FAILED", message: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      error: "Something went wrong",
    });
  }
};
