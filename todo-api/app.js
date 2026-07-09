const express = require('express')
const todoRouter = require('./routes/todo')
const app = express()
// const {DateTimeFormatterMiddleware,ValidateTodoBody} = require('./middlewares/todo')
//middlewares for handling incoming request
app.use(express.json())
app.use(express.urlencoded({extended : true}))
//// Validate and adjust date for POST and PUT/PATCH skips for GET
// app.use(DateTimeFormatterMiddleware);
// app.use(ValidateTodoBody);

// // routes
app.get('/health',(req,res)=>{
      return res.status(200).json({
        success: "Success",
        message: "Application Is healthy"
      });
})
app.use('/api/todo',todoRouter)

module.exports = app;