import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import './styles/styles.scss';

const client = new ApolloClient({
  uri: 'https://swrpg-be.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);


