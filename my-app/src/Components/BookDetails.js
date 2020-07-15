import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBook } from "../queries/queries";

class BookDetails extends Component {

    DisplayDetails() {
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
                    <p className="p-2">Author's Nationality: {book.author.nationality}</p>
                    <hr />
                    <h5 className="p-2">Books by the Author</h5>
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
