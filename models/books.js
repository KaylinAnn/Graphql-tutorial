const mongoose = require('mongoose')
const Schema = Mongoose.Schema

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
})

module.exports = mongoose.model('Book', bookSchema)