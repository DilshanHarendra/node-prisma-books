const express = require('express')
const app = express()


app.get('/',(req,res)=>{
    res.status(200).send({
        message: 'welcome to prima'
    })
})


app.get('/books',(req,res)=>{

})


app.listen(8000,()=>console.log("server running on http://localhost:8000"))
