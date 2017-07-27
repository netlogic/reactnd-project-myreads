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

  constructor(props) {
    super();
    this.onShelfChange.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      console.log(books);
      this.setState({ books : books.sort(sortBy('title')) });
    }).catch(function() {
        alert( "An error happen talking to the book server.  Please check your internet connection and refresh page to try again!")
    });
  }

  onShelfChange( book , shelf ) {

    BooksAPI.update( book, shelf ).then( res => {
       let newBooks;
        console.log(res);
        // remove the book from the current array
       newBooks  = this.state.books.filter( (oldbook) => { 
                return ( book.id !== oldbook.id )
            } );
        if ( shelf !== 'none' ) {  
          book.shelf = shelf;
        }
        newBooks.push( book );
        this.setState({ books : newBooks.sort(sortBy('title')) });
    }).catch(function() {
        alert( "An error happen.  Please check your internet connection try again!")
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => {
          return (
            <ListBooks books={this.state.books} onShelfChange={ (book,shelf) => { this.onShelfChange(book,shelf)} }/>
          );
        }} />
        <Route exact path='/search' render={(history) => {
          return (
            <SearchBooks onShelfChange={ (book,shelf) => { this.onShelfChange(book,shelf)} }/>
          );
        }} />
      </div>
    )
  }
}

export default BooksApp
