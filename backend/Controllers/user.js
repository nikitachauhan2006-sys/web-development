const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, photoUrl } = req.body;

    const userExist = await User.findOne({ email });

    if (!userExist) {
      let newUser = new User({
        name,
        email,
        photoUrl,
      });

      await newUser.save();

      return res.status(200).json({
        message: "User Registered Successfully",
        user: newUser,
      });
    }

    return res.status(200).json({
      message: "User already exists",
      user: userExist,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Server error",
      message: err.message,
    });
  }
};