import React, { Component } from "react";
import { graphql } from "react-apollo";
import { BooksQuery } from "../queries/queries";
import  BookDetails  from "./BookDetails";
import AddAuthor from "./AddBook";

class BookList extends Component {
  constructor(props){
    super(props)
    this.state =
    ({
        clicked: ""
    })
  }
  //what should i ty
  DisplayBooks() {

    let Data = this.props.data;
    
      if (Data.loading) {
        return (
          <div>Books Loading...</div>
        )
      }
      else {
        console.log(Data.books);
        return  Data.books.map(book => {
            return (
              <li key={book.id} onClick={(e => this.setState({ clicked: book.id }))} className="d-inline-block" id="BookList"> {book.name}</li>
            )
          })
        }

      
    }
    
    
 

  render() {
    
    return (
      <div className="row pt-3 ml-2">
        <div className="col-md-6 m-1" id="books-container">
          <ul className=" container p-0">
            {this.DisplayBooks()}
          </ul>
          <AddAuthor />
        </div>
        <div className="col-md-5 container-fluid" id="book-Display">
          <BookDetails bookid={this.state.clicked} />
        </div>
      </div>
    );
};
}

export default graphql(BooksQuery)(BookList);
