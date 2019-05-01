import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { getAuthorsQuery } from '../../Queries/Queries'

export class AddBook extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      genre: '',
      authorId: ''
    }
  }


  displayAuthors() {
    const data = this.props.data
    if (data.loading) {
      return (<option>Loading Authors...</option>)
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      })
    }
  }

  submitForm(e) {
    e.preventDefault()
    console.log(this.state);

  }

  render() {
    return (
      <form className='add-book' onSubmit={this.submitForm.bind(this)}>
        <div>
          <label>Book name:</label>
          <input type="text" onChange={(e) => { this.setState({ name: e.target.value }) }} />
        </div>
        <div>
          <label>Genre:</label>
          <input type="text" onChange={(e) => { this.setState({ genre: e.target.value }) }} />
        </div>
        <div>
          <label>Author:</label>
          <select onChange={(e) => { this.setState({ authorId: e.target.value }) }}>
            <option>Select Author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    )
  }
}

export default graphql(getAuthorsQuery)(AddBook)
