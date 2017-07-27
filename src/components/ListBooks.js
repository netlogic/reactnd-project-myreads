import React from 'react'
import '../App.css'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf.js'

export default class ListBooks extends React.Component {

    render() {
        let { books } = this.props;

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf title="Currently Reading" books={books.filter((book) => {
                            return (book.shelf === 'currentlyReading');
                        })} />
                        <BookShelf title="Want To Read" books={books.filter((book) => {
                            return (book.shelf === 'wantToRead');
                        })} />
                        <BookShelf title="Read" books={books.filter((book) => {
                            return (book.shelf === 'read');
                        })} />
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}


ListBooks.propTypes = {
    books: PropTypes.array.isRequired
};
