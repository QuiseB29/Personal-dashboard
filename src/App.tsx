import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Profile from './components/Profile';
import './index.css';
import PostsSection from './components/PostSection';
import Form from './components/Form';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api', // Replace with your GraphQL API URI
  cache: new InMemoryCache(),
});

const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Business Page</h1>
        <Form />
        <Profile />
        <PostsSection />
      </div>
    </ApolloProvider>
  );
};

export default App;