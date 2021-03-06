import { gql } from "apollo-boost";


const AuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

const BooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

const AddBookMutation = gql`
  mutation($name: String!, $genre: String!, $authorid: ID!) {
    addBook(Name: $name, Genre: $genre, AuthorId: $authorid) {
      name
      id
    }
  }
`;

const AddAuthor = gql`
  mutation($name: String!, $nationality: String!) {
    addAuthor(Name: $name, nationality: $nationality) {
      name
      id
    }
  }
`;

const getBook = gql`
query($id:String){
    book(id:$id){
        name 
        genre
        id
        author{
            name 
            nationality 
            id 
            books{
                name
                }
            }
        }
    }
`;

export { BooksQuery, AddBookMutation, AuthorsQuery, getBook, AddAuthor };
