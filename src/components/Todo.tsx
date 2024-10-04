import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      data {
        id
        title
        completed
      }
    }
  }
`;

const TodoList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      <h1>Todo List</h1>
      {data.todos.data.map((todo: any) => (
        <li key={todo.id}>
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
