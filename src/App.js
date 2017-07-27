import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './components/SearchBooks.js'
import ListBooks from './components/ListBooks.js'
import { Route } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

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
      this.setState({ books : books.sort(sortBy('title')) });
    })
  }

  onShelfChange( book , shelf ) {
    alert( "move " + book.title + " to " + shelf );
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => {
          return (
            <ListBooks books={this.state.books} onShelfChange={this.onShelfChange}/>
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
