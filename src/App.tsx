import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Profile from './components/Profile';
import './index.css';
import PostsSection from './components/PostSection';
import Form from './components/Form';
import Albums from './components/Album'; // Import Albums component
import TodoList from './components/Todo';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api', // GraphQL API URI
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const userId = "1"; // Replace with the actual user ID

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Business Page</h1>
        <Form />
        <TodoList />
        <Albums userId={userId} /> {/* Pass userId as prop */}
        <Profile />
        <PostsSection />
      </div>
    </ApolloProvider>
  );
};

export default App;
