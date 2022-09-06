const userSchema = require("../model/userSchema");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }
  try {
    const user = await userSchema.findOne({ email });
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5min",
      });
      const data = {
        from: process.env.EMAIL,
        to: email,
        subject: "Password Reset",
        html: `
                <h2>Please click on given link to reset your password</h2>

                <p>${process.env.CLIENT_URL}/resetPassword/${token}</p>
            `,
      };
       user.updateOne({ resetLink: token }, (err, success) => {
        if (err) {
          return res.status(400).json({ error: "Reset password link error" });
        } else {
          transporter.sendMail(data, (err, data) => {
            if (err) {
              console.log("Error Occurs", err);
              res.status(500).json({ error: err });
            } else {
              console.log("Email sent!!!");
              res.status(200).json({ message: "OTP sent to your email", token });
            }
          });
        }
      });
    } else {
      return res
        .status(400)
        .json({ error: "User with this email does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};
