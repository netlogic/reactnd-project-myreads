import React from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import sortBy from 'sort-by'
import Book from './Book.js'

export default class BooksApp extends React.Component {

    state = {
        query: '',
        books: [],
    }

    updateQuery = (query) => {
        let q = query.trim();
        if (q) {
            this.setState({ query: q})
            this.executeQuery(q);
        } else {
            this.clearQuery();
        }
    }

    clearQuery = () => {
        this.setState({ query: '', books: [] })
    }

    componentDidMount() {
        if ( this.state.query ) {
            this.executeQuery();
        }
    }

    executeQuery(q) {
        console.log("executing search query = " + q);
        BooksAPI.search(q, 20).then(books => {
           
            this.setState({ books: books.sort(sortBy('title')) });
        }).catch(function (error) {
            console.log( "Error on search " + JSON.stringify(error) );
            alert("An error happen talking to the book server.  Please check your internet connection and refresh page to try again!")
        });
    }

    render() {
        let { query , books } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
                    <div className="search-books-input-wrapper">
                        {/* 
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />

                    </div>
                </div>
                
                <div className="search-books-results">
                         { this.state.query && books.length === 0 &&  (
                            <p>Nothing found!</p>
                        )}
                        { !this.state.query &&  (
                            <p>Please enter something to search for</p>
                        )}
                    <ol className="books-grid">
                   
                         {books.map((book) => {
                            return (
                                <Book key={book.id} book={book} onShelfChange={this.props.onShelfChange} />
                            );
                        })}
                    </ol>
                </div>
            </div>
        )
    }
}