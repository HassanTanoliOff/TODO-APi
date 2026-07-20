import dotenv from "dotenv/config"
import jwt from "jsonwebtoken"
const secret = process.env.JWT_SECRET_KEY;

const verifyUser = (req, res, next) => {
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

export default verifyUser;