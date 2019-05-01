const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true })

mongoose.connection.once('open', () => {
  console.log('db connected');

})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('listening on port 4000');

})


