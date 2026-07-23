import bcrypt from "bcrypt";
import User from "../models/user.js";
import tokenGen from "../authentication/jwtTokenGenerator.js";

const signUp = async (req, res) => {
  try {
    const { userName, email, phone, password } = req.body;
    const profilePic = req.file;
    // if(!profilePic) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Image is required" });
    // }
    const path = profilePic ? `uploads/profile/${profilePic.filename}` : undefined;
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
      profilePic : path ?? null
    });
    const userCreated = await User.create(newUser);
    return res.status(201).json({
      success: true,
      message: "User Registered.",
      data: ` ${userCreated.userName} : ${userCreated.email}`,
    });
  } catch (err) {
    console.log("inside controller catch block");
    return res.status(500).json({
      success: false,
      message: "Failed to Register User.",
      error: err.message,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email })
      .select("+password")
      .lean();
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Email or password is incorrect." });

    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Email or password is incorrect." });

    const jwtToken = tokenGen(user._id);
    if (!jwtToken)
      return res
        .status(401)
        .json({ success: false, message: "Failed to login" });

    delete user.password;
    user.profileUrl = `http://localhost:8080/src/${user.profilePic}` 

    return res.status(200).json({
      success: true,
      message: "User Logged in.",
      token: jwtToken,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err.message,
    });
  }
};

export { signUp, signIn };
