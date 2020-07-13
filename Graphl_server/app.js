const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require("cors")

const app = express();
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

// app.get('/createBook', async (req, res) => {
//     console.log(req.body)
// })


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server connected at port ${PORT}`)
})