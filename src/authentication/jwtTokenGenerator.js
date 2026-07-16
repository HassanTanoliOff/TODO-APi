const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
secretKey = process.env.jwtSecretKey;
const expiration = "12h";

module.exports.tokenGen = (id) =>{  

  const  token = jwt.sign({id}, secretKey, { expiresIn: expiration });
  return token
}
