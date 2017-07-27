This application was created from the start application supplied.


All changes can be review at the following repository.


https://github.com/netlogic/reactnd-project-myreads.git


In order to run this on your machine please make sure nodejs and npm are installed.

MAC specific instructions:

go to a terminal window  

clone my repository

    git clone https://github.com/netlogic/reactnd-project-myreads.git

go to the directory reactnd-project-myreads.git

    cd reactnd-project-myreads.git

install needed packages

    npm install


start the sample application

    npm start

Have fun moving books around and searching!

NOTE:

You will see in the component a fix for the search results api to correctly update the shelf.

The server does not return the current shelf for a book the user has.

Code from SearchBooks.js

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

I look forward to all comments and suggestions on how to improve my code.

Thank you for reviewing.
Bret


