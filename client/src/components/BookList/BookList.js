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
  render() {
    console.log(this.props);

    return (
      <div>
        <ul className='book-list'>
          <li>Book Name</li>
        </ul>
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList)
