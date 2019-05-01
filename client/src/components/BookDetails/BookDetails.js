import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../../Queries/Queries'

export class BookDetails extends Component {

  displayBookDetails() {
    const { book } = this.props.data

    if (book) {
      return (
        <div>
          <h2>{book.name}</h2>
          <p>{book.genre}</p>
          <p>{book.author.name}</p>
          <p>All books by author:</p>
          <ul>
            {book.author.books.map(e => {
              return <li key={e.id}>{e.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return (
        <div>No book selected...</div>
      )
    }
  }

  render() {

    return (
      <div>
        {this.displayBookDetails()}
      </div>
    )
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)
