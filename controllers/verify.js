const userOTPVerification = require("../model/userOTPVerification");
const bcrypt = require("bcrypt");


exports.verify = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    if (!userId || !otp) {
      return res.status(422).json({ error: "Please fill all the fields" });
    }

    const user = await userOTPVerification.findOne({ userId });
    if (user) {
      const expiresAt = user.expiresAt;
      const validOTP = await bcrypt.compare(otp, user.otp);

        const exp = expiresAt > Date.now();
        console.log(exp)

      if (validOTP && exp) {
          await userOTPVerification.deleteOne({ userId });
          console.log("OTP verified and deleted");
        res
          .status(201)
          .json({
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
