import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../../Queries/Queries'


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
