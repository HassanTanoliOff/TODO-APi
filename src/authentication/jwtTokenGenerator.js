import "dotenv/config";
import jwt from "jsonwebtoken";
const secretKey = process.env.JWT_SECRET_KEY;
const expiration = "12h";

 const tokenGen = (id) =>{  

  const  token = jwt.sign({id}, secretKey, { expiresIn: expiration });
  return token
}

export default tokenGen;