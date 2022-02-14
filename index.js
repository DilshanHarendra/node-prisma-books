const express = require('express')
const cors = require('cors')
const app = express()
const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser');

app.use(bodyParser());
app.use(cors())
const prisma = new PrismaClient()


prisma.$connect().then(()=>console.log("db connected")).catch(err=>console.log(err))

app.get('/',(req,res)=>{
    res.status(200).send({
        message: 'welcome to prima'
    })
})


app.get('/books',(req,res)=>{
    prisma.books.findMany().then(books=>{
        res.status(200).send({
            data: books
        })
    }).catch(err=>{
        res.status(400).send({
            error: err
        })
    })

})

app.get('/book/:id',(req,res)=>{
    prisma.books.findUnique({
        where:{
           id:parseInt(req.params.id)
        },
        include: {
            author: true,
        },
    }).then(books=>{
        res.status(200).send({
            data: books
        })
    }).catch(err=>{
        res.status(400).send({
            error: err
        })
    })
})



app.post('/books',(req,res)=>{

    prisma.books.create({
        data:{
            title: req.body.title,
            category: req.body.category,
            author:{
                connect: {id:req.body.author}
            }

        }
    }).then(book=>{
        res.status(200).send({
            data: book
        })
    }).catch(err=>{
        res.status(400).send({
            error: err
        })
    })

})


app.get('/authors',(req,res)=>{
    prisma.author.findMany()
        .then(authors=>{
        res.status(200).send({
            data: authors
        })
    }).catch(err=>{
        res.status(400).send({
            error: err
        })
    })
})

app.get('/author/:id',(req,res)=>{
    console.log(req.params.id)
    prisma.author.findUnique({
        where:{
            id:parseInt(req.params.id)
        },
        include: {
            books: true,
        },
    })
        .then(authors=>{
            res.status(200).send({
                data: authors
            })
        }).catch(err=>{
        res.status(400).send({
            error: err
        })
    })
})



app.post('/author',(req,res)=>{
    prisma.author.create({
        data: req.body,

    }).then(author=>{
        res.status(200).send({
            data: author
        })
    }).catch(err=>{
        res.status(400).send({
            error: err
        })
    })

})




app.listen(8000,()=>console.log("server running on http://localhost:8000"))
