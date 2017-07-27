import React from 'react'
import '../App.css'
import * as BooksAPI from '../BooksAPI'
import sortBy from 'sort-by'


export default class BooksApp extends React.Component {

    state = {
        query: '',
        books: [],
    }

    updateQuery = (query) => {
        let q = query.trim();
        if (q) {
            this.setState({ query: query.trim() })
            this.executeQuery();
        } else {
            this.clearQuery();
        }
    }

    clearQuery = () => {
        this.setState({ query: '', books: [] })
    }

    componentDidMount() {
        this.executeQuery();
    }

    executeQuery() {
        BooksAPI.search(this.state.query, 10).then(books => {
            this.setState({ books: books.sort(sortBy('title')) });
        }).catch(function () {
            alert("An error happen talking to the book server.  Please check your internet connection and refresh page to try again!")
        });
    }

    render() {
        let { query } = this.state;

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
                    <ol className="books-grid">

                    </ol>
                </div>
            </div>
        )
    }
}