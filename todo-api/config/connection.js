const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const DBconnect = process.env.connectionString;


 async function mdbConnection (){
      try{
           await mongoose.connect(DBconnect)
            console.log("Connected to MongoDB")
      }
      catch(err){
            console.log({message : `Failed to connect to DB Error:${err.message}`});
      }
}

module.exports = mdbConnection;

// const mdbConnection = async ()=>{
//       try {
//         await mongoose.connect(DBconnect);
//         console.log("Connected to MongoDB");
//       } catch (err) {
//         console.log({
//           message: `Failed to connect to DB Error:${err.message}`,
//         });
//       }
// }