const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(cors())

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


