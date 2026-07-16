const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.jwtSecretKey;

module.exports.verifyUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ success: false, message: "Unauthorized" });
  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err)
      return res.status(401).json({ success: false, error: "Unauthorized" });
    req.user = decoded;
    console.log(decoded)
    next();
  });
};
