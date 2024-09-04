import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '../queries/Queries.tsx';

const ProfileSection: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>User Profiles</h1>
      {data.posts.data.map((post: any) => (
        <div key={post.id}>
          <h2>{post.user.name}</h2>
          <p>Email: {post.user.email}</p>
          <p>Address: {`${post.user.address.street}, ${post.user.address.suite}, ${post.user.address.city}, ${post.user.address.zipcode}`}</p>
          <p>Phone: {post.user.phone}</p>
          <p>Website: {post.user.website}</p>
          <p>Company: {post.user.company.name}</p>
          <p>Catch Phrase: {post.user.company.catchPhrase}</p>
          <p>Business: {post.user.company.bs}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileSection;
