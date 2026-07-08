const express = require('express')
const todoRouter = require('./routes/todo')
const app = express()
const {DateTimeFormatterMiddleware} = require('./middlewares/todo')

//middlewares for handling incoming request
app.use(express.json())
app.use(express.urlencoded({extended : true}))
//// Validate and adjust date for POST and PUT/PATCH skips for GET
app.use(DateTimeFormatterMiddleware);


// // routes
app.get('/',(req,res)=>{
      return res.end(`
            <h1>HOME</h1>
            <p> Go to  url: http://localhost:8001/api/todos  </p>
            `)
})
app.use('/api/todo',todoRouter)

module.exports = app;