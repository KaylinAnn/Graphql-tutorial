const express = require('express')
const graphqlHTTP = require('express-graphql')
const { graphql, buildSchema } = require('graphql')
const schema = require('./schema/schema')

const app = express()

app.use('/graphql', graphqlHTTP({
  schema
}))

app.listen(4000, () => {
  console.log('listening on port 4000');

})


