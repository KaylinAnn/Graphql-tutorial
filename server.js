var express = require('express')
var graphqlHTTP = require('express-graphql')
var { graphql, buildSchema } = require('graphql')

var schema = buildSchema(`
  type Query {
    hello: String,
    age: Int,
    quoteOfTheDay: String,
    rollThreeDice:[Int],
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
  `)

var root = {
  hello: () => {
    return 'Hello world!'
  },
  age: () => {
    return 93
  },
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
  },
  rollThreeDice: () => {
    return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
  },
  rollDice: function ({ numDice, numSides }) {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  }
}

graphql(schema, '{hello, age, quoteOfTheDay, rollThreeDice, rollDice}', root).then(res => {
  console.log(res);

})

var app = express()
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(4000)

console.log('Running Graphql API server at localhost:4000/graphql');
