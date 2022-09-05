
const User = require("../model/userSchema");
const {sendOTP} = require("../utilities/sendOTP");


exports.signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(422).json({ error: "Please fill all the fields" });
  }
  if (
    !/^([a-zA-Z0-9\.-]+)@([a-zA-Z0-9-]+).([a-z]{2,8})(.[a-z]{2,8})?$/.test(
      email
    )
  )
    return res.status(422).json({ error: "Invalid Email" });

  try {
    console.log("checking if user already exists");
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      console.log("user found in db");
      return res.status(422).json({ error: "User already exist" });
    } else {
      console.log("adding user to db");

        const user = new User({ firstName, lastName, email, password });
        // sendOTP({ _id: user._id, email: email }, res);
        
      console.log("saving the data to db");
      await user.save();
      console.log("data saved");
      res
        .status(201)
        .json({ message: "User registered successfully", dataSaved: user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
    
    
}