import React from 'react'
import '../App.css'
import PropTypes from 'prop-types';


export default class Book extends React.Component {

    handleChange(e, book) {
        let newShelf = e.target.value;
        let move = false;

        if (newShelf !== book.shelf) {
            if (newShelf === 'none') {
                if (confirm(`Are you sure you want to remove ${book.title} from your books?`)) {
                    move = true;
                }
            } else {
                if (confirm(`Are you sure you want to move ${book.title} to a different shelf?`)) {
                    move = true;
                }
            }
        }
        if (move) {
            this.props.onShelfChange(book, newShelf);
        }
    }

    render() {
        let { book } = this.props;

        let imageURL;

        if (book.imageLinks) {
            imageURL = book.imageLinks.thumbnail || book.imageLinks.smallThumbnail;
        }

        if (!imageURL) {
            // console.log("this book has no image, database needs to be fixed! ", book);
            imageURL = "./favicon.ico";
        }

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${imageURL})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={book.shelf} onChange={(e) => {
                                this.handleChange(e, book);
                            }}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.author !== undefined ? book.authors.join(" + ") : ""}</div>
                </div>
            </li>
        );
    }
}


Book.propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired,
};


