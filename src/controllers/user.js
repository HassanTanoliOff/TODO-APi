const User = require("../models/user");

const getUsers = (req, res) => {};
const signUp = async (req, res) => {
  const { userName, email, phone, password } = req.body;
  console.log("inside controller before try");
  try {
    const userExists = await User.findOne({ email: email });
    console.log("inside controller before try if ");
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }
    const newUser = new User({
      userName,
      email,
      phone,
      password,
    });
    const userCreated = await User.create(newUser);
    return res
      .status(201)
      .json({
        success: true,
        message: "User Registered.",
        data: userCreated.userName,
      });
  } catch (err) {
    console.log("inside controller catch block");
    return res
      .status(500)
      .json({
        success: false,
        message: "Failed to Register User.",
        error: err.message,
      });
  }
};

module.exports = {
  getUsers,
  signUp,
};
