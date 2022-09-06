const User = require("../model/userSchema");

exports.resetPassword = async (req, res) => {
    const { password, token } = req.body;
    if (!password || !token) {
        return res.status(422).json({ error: "Please fill all the fields" });
    }
    try {
        const user = await User.findOne({ resetLink: token });
        if (user) {
        const obj = {
            password,
            resetLink: "",
        };
        User.findByIdAndUpdate(user._id, obj, (err, success) => {
            if (err) {
            return res.status(400).json({ error: "reset password error" });
            } else {
            return res.status(200).json({ message: "Password reset success" });
            }
        });
        } else {
        return res.status(400).json({ error: "User with this token does not exist" });
        }
    } catch (error) {
        console.log(error);
    }
    }