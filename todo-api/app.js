const express = require('express')
const todoRouter = require('./routes/todo')
const app = express()

//middlewares 
app.use(express.json())
app.use(express.urlencoded({extended : false}))



// // routes
app.get('/',(req,res)=>{
      return res.end(`
            <h1>HOME</h1>
            <p> Go to  url: http://localhost:8001/api/todos  </p>
            `)
})
app.use('/api/todo',todoRouter)

module.exports = app;