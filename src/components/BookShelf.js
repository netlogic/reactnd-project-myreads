import React from 'react'
import '../App.css'
import PropTypes from 'prop-types';
import Book from './Book.js'

export default class BookShelf extends React.Component {

    render() {
        return (

            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => {
                            return (
                                <Book key={book.id} book={book} />
                            );
                        })}
                        {!this.props.books.length && (
                            <p>No books currently on this shelf!</p>
                        )
                        }
                    </ol>
                </div>
            </div>

        );
    }
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};
