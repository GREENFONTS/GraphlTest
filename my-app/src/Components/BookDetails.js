import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBook } from "../queries/queries";

class BookDetails extends Component {
    DisplayDetails() {
//dont u neeed the node modules due t0 the packages i installed
      // why we have the package .json file
      // it allows any user to run the npm install commadn ok cool    
        let Data = this.props.data;
        const { book } = this.props.data
        if (Data.loading) {
            return <div>Books Details Loading...</div>;
        } else {
            if (book) {
                return (
                  <div id="Book-Details">
                    <h3 className="p-2"> {book.name}</h3>
                    <p className="p-2">Genre: {book.genre}</p>
                    <p className="p-2">Author: {book.author.name}</p>
                    <hr />
                    <h5 className="p-2">Other books by the Author</h5>
                    {book.author.books.map((book) => {
                      return (
                        <ul className="p-2">
                          <li key={book.id}>{book.name}</li>
                        </ul>
                      );
                    })}
                  </div>
                );
            }
            else {
                return (
                  <div>
                    <hr />
                    No book selected...
                  </div>
                );
            }
    }
  }

    render() {
      
    return (
      <div className="container">
        {this.DisplayDetails()}
      </div>
    );
  }
}

export default graphql(getBook, {
    options: (props) => {
        return {
            variables: {
                id: props.bookid
            }
        }
    }
})(BookDetails);
