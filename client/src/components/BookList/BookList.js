import React, { Component } from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooksQuery = gql`
{
  books{
    name
    genre
  }
}
`

class BookList extends Component {

  getBooks() {
    const data = this.props.data

    if (data.loading) {
      return (<div>Loading books...</div>)
    } else {
      return data.books.map(book => {
        return (
          <li key={book.name}>
            {book.name}
          </li>
        )
      })
    }
  }

  render() {
    console.log(this.props);

    return (
      <div>
        <ul className='book-list'>
          {this.getBooks()}
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
