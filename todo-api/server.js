const app = require('./app.js')
const dotenv = require('dotenv')
const DBconnect = require('./config/connection.js')
dotenv.config()

port = process.env.PORT || 3002;

DBconnect().then(()=>{
      app.listen(port,()=> console.log("Server started at port:",port))
})