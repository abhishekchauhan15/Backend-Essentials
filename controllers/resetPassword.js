const User = require("../model/userSchema");
const bcrypt = require("bcrypt");


exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
          return res.status(400).json({ error: "Please fill all the fields" });
        
        const user = await User.findOne({ email: email });
        if (user) {
          const newPassword = await bcrypt.hash(password, 10);
          await User.updateOne({ email: email }, { password: newPassword });
          res.status(200).json({ message: "Password updated successfully" });
        } else {
          res.status(400).json({ error: "User does not exist" });
        }
      } catch (error) {
        console.log(error);
      }
}