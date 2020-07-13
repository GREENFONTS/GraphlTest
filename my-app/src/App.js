import React from 'react';
import "./index.css";
import BookList from "./Components/BookList";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";


const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

const App = () => {
  // let BookName = document.getElementById('Name')
  
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1 className="header text-center p-3" id="header-text"> My BookList</h1>
        <div className="container-fluid m-2">  
        <BookList />
          
        </div>
        </div>
    </ApolloProvider>
  );
}

export default App;
