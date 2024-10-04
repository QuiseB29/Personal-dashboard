

import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// GraphQL mutations for create, update, and delete user
const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      name
      email
      username
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      username
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

const CreatePostForm: React.FC = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<string | null>(null); // To store the user ID for update/delete

  // useMutation hooks
  const [createUser, { data: createdUserData, loading: createLoading, error: createError }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setName('');
      setEmail('');
      setUsername('');
    },
  });

  const [updateUser, { data: updatedUserData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER);

  const [deleteUser, { data: deletedUserData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_USER);

  // Handle create user submission
  const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUser({
      variables: {
        input: { name, email, username },
      },
    });
  };

  // Handle update user submission
  const handleUpdateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!userId) return;

    updateUser({
      variables: {
        id: userId,
        input: { name, email, username },
      },
    });
  };

  // Handle delete user
  const handleDelete = () => {
    if (!userId) return;

    deleteUser({ variables: { id: userId } });
  };

  return (
    <div>
      {/* Form for Creating a New User */}
      <form onSubmit={handleCreateSubmit}>
        <h3>Create New User</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <button type="submit" disabled={createLoading}>
          {createLoading ? 'Creating...' : 'Create User'}
        </button>
      </form>

      {createLoading && <p>Loading...</p>}
      {createError && <p>Error: {createError.message}</p>}

      {/* Display newly created user */}
      {createdUserData && createdUserData.createUser && (
        <div>
          <h2>Newly Created User:</h2>
          <p>ID: {createdUserData.createUser.id}</p>
          <p>Name: {createdUserData.createUser.name}</p>
          <p>Email: {createdUserData.createUser.email}</p>
          <p>Username: {createdUserData.createUser.username}</p>

          {/* Save user ID for updating or deleting */}
          <button onClick={() => setUserId(createdUserData.createUser.id)}>Select User for Update/Delete</button>
        </div>
      )}

      {/* Update Form */}
      {userId && (
        <form onSubmit={handleUpdateSubmit}>
          <h3>Update User</h3>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Update Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Update Email"
            required
          />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Update Username"
            required
          />
          <button type="submit" disabled={updateLoading}>
            {updateLoading ? 'Updating...' : 'Update User'}
          </button>
        </form>
      )}

      {updateLoading && <p>Updating...</p>}
      {updateError && <p>Error: {updateError.message}</p>}
      {updatedUserData && updatedUserData.updateUser && (
        <div>
          <h2>Updated User:</h2>
          <p>ID: {updatedUserData.updateUser.id}</p>
          <p>Name: {updatedUserData.updateUser.name}</p>
          <p>Email: {updatedUserData.updateUser.email}</p>
          <p>Username: {updatedUserData.updateUser.username}</p>
        </div>
      )}

      {/* Delete Button */}
      {userId && (
        <div>
          <h3>Delete User</h3>
          <button onClick={handleDelete} disabled={deleteLoading}>
            {deleteLoading ? 'Deleting...' : 'Delete User'}
          </button>
        </div>
      )}

      {deleteLoading && <p>Deleting...</p>}
      {deleteError && <p>Error: {deleteError.message}</p>}
      {deletedUserData && <p>User deleted successfully.</p>}
    </div>
  );
};

export default CreatePostForm;

