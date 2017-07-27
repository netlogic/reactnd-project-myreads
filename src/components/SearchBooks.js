import React from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import sortBy from 'sort-by'
import Book from './Book.js'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

export default class SearchBooks extends React.Component {

    state = {
        query: '',
        books: [],
    }

    updateQuery = (query) => {
        let q = query.trim();
        if (q) {
            this.executeQuery(q);
        } else {
            this.clearQuery();
        }
    }

    clearQuery = () => {
        this.setState({ query: '', books : [] })
    }

    componentDidMount() {
        if (this.state.query) {
            this.executeQuery(this.state.query);
        }
    }

    // the server is not correctly 
    // returning the user shelf on search
    // results.  This routine looks 
    // through current books
    // and correct the shelfs for the user
    fixShelfForBadServerData( books ) {
        let currentBooks = this.props.currentBooks;
        books.map( book=> {
            currentBooks.map( currentBook => {
                if ( currentBook.id === book.id ) {
                    book.shelf = currentBook.shelf;
                }
                return currentBook;
            });
            return book;
        });
    }

    executeQuery(q) {
        let lastQuery = q;
        console.log("executing search query = " + q);
        this.setState({ executingQuery: true, query: q });
        BooksAPI.search(q, 20).then(books => {
            if ( lastQuery !== this.state.query  ) {
                return; // the query has changed while we were loading
                        // so jsut go hoem
            }
            if ( Array.isArray( books ) ) {
                this.fixShelfForBadServerData( books );
                this.setState({ books: books.sort(sortBy('title')), executingQuery: false });
                console.log( books );
            } else {
                // empty query
                this.setState({ executingQuery: false , books : []  });
            }
        }).catch(  (error) => {
            console.log("Error on search " + JSON.stringify(error));
            this.setState({ executingQuery: false });
        });
    }

    render() {
        let { query, books, executingQuery } = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">>Close</Link>
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

                {executingQuery && (
                    <a>Searching...</a>
                )}

                {!executingQuery && (
                    <div className="search-books-results">
                        {this.state.query && books.length === 0 && (
                            <p>Nothing found!</p>
                        )}
                        {!this.state.query && (
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
                )
                }
            </div>
        )
    }
}


SearchBooks.propTypes = {
    currentBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
};
