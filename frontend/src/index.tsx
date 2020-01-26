import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';

import App from './App';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const wsLink = new WebSocketLink({
  uri: `ws://localhost:3001/graphql`,
  options: {
    reconnect: true,
  },
});

const terminatingLink = split(
  ({ query }) => {
    // @ts-ignore
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const link = ApolloLink.from([terminatingLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'));

