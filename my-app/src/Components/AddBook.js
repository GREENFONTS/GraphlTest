import React, { Component } from "react";
import { graphql } from "react-apollo";
import { compose } from "recompose";
import{ AuthorsQuery, AddBookMutation, BooksQuery, AddAuthor} from "../queries/queries"

class AddBook extends Component {
    constructor(props) {
        super(props)
        this.state = {
            BookName: "",
            Genre: "",
          AuthorId: "",
          AuthorName: "",
          Age: "",
          BookDisplay: false,
            AuthorDisplay: true
        }
    }

  DisplayAuthors() {
    let Data = this.props.getAuthors
    if (Data.loading) {
      return (
        <option disabled>Authors Loading...</option>
      )
    }
    else {
     
        return Data.authors.map(author => {
          return (
            <option key={author.id} value={author.id}> {author.name}</option>
          )
        })
      }
  }
      
    BookPost(e) {
      // e.preventDefault()
      this.props.AddBooks({
         variables: {
          name: this.state.Name,
          genre: this.state.Genre,
           authorid: this.state.AuthorId
        },
        refetchQueries: [{query: BooksQuery}]
        
      })
    
       
  }
   ///something is wrong.....which master is it seeing
  AuthorPost(e) {
    e.preventDefault()
    console.log(this.props)
    this.props.AddAuthor({
      variables: {
        name: this.state.AuthorName,
        age: parseInt(this.state.Age)
      }
    })
  }
  
  BookForm() {
    return (
      <form
        onSubmit={this.BookPost.bind(this)}
        className="container p-3">
       <div className="form-group">
          <label>Book Name:</label>
          <input   
               className="form-control"
             type="text"
             name="Name"
             placeholder="Enter book name"
             id="Name"
             onChange={(e) => { 
               this.setState({ Name: e.target.value });
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Book Genre:</label>
          <input
            className="form-control"
            type="text"
            name="Genre"
            placeholder="Enter book genre"
            id="Genre"
            onChange={(e) => {
              this.setState({ Genre: e.target.value });
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Author: </label>
          <select
            id="authors"
            // className="form-control"
            onChange={(e) => {
              this.setState({ AuthorId: e.target.value });
            }}
           required>
            <option>Select Author</option>
            {this.DisplayAuthors()}
          </select>
        </div>
       
        <button
          // className="btn btn-info rounded-circle "
          type="submit"
          id="addbutton"
        >
          +
        </button> 
        </form>
    )
  }

  AuthorForm() {
    return (
      <form
        onSubmit={this.AuthorPost.bind(this)}
        className="container p-3"
      >
        <div className="form-group">
          <label>Author: </label>
          <input
            type="text"
            placeholder="Enter Author name"
            onChange={(e) => {
              this.setState({ AuthorName: e.target.value });
            }}
           required/>
        </div>
        <div className="form-group">
          <label>Author's Age: </label>
          <input
            type="tel"
            placeholder="Enter Author's Age"
            onChange={(e) => {
              this.setState({ Age: e.target.value });
            }}
         required />
        </div>
        <button
           // className="btn btn-info rounded-circle "
          type="submit"
          id="addbutton"
        >
          +
        </button>
      </form>
    );
  }
  

  Displaychoice() {
    if (this.state.AuthorDisplay === true) {
      return (
      this.AuthorForm() 
      )
    }
    else {
      return(
        this.BookForm()
      )
    }
  }

  render() {
    return (
      <div className="form">
        {this.Displaychoice()}
        <button
          className="btn btn-info mr-2 mt-2"
          onClick={(e) => {
            this.setState({
              AuthorDisplay: true,
              BookDisplay: false,
            });
          }}
        >
          Add Author
        </button>
        <button
          className="btn btn-info ml-3 mt-2"
          onClick={(e) => {
            this.setState({
              AuthorDisplay: false,
              BookDisplay: true,
            });
          }}
        >
          Add Book
        </button>
      </div>
    );
  }
}

export default compose(
  graphql(AuthorsQuery, { name: "getAuthors" }),
  graphql(AddBookMutation, { name: "AddBooks" }),
  graphql(AddAuthor, { name: "AddAuthor" })
)(AddBook);

