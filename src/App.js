import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks.js'
import ListBooks from './components/ListBooks.js'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({ books });
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => {
          return (
            <ListBooks books={this.state.books} />
          );
        }} />
        <Route exact path='/search' render={(history) => {
          return (
            <SearchBooks />
          );
        }} />
      </div>
    )
  }
}

export default BooksApp
