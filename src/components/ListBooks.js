import React from 'react'
import '../App.css'
import PropTypes from 'prop-types';
import BookShelf from './BookShelf.js'
import { Link } from 'react-router-dom'

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
                        })} onShelfChange={this.props.onShelfChange} />
                        <BookShelf title="Want To Read" books={books.filter((book) => {
                            return (book.shelf === 'wantToRead');
                        })} onShelfChange={this.props.onShelfChange} />
                        <BookShelf title="Read" books={books.filter((book) => {
                            return (book.shelf === 'read');
                        })} onShelfChange={this.props.onShelfChange} />
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search' className='open-search'>Add a book</Link>
                </div>
            </div>
        )
    }
}


ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired,
};
