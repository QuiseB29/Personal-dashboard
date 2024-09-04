import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_POSTS } from '../queries/Queries';

const PostsSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5; // Number of posts per page

  const { loading, error, data } = useQuery(GET_USER_POSTS, {
    variables: { page, limit },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const totalPages = Math.ceil(data.posts.meta.totalCount / limit);

  return (
    <div>
      <h1>User Posts</h1>
      <div className="posts-container">
        {data.posts.data.map((post: any) => (
          <div key={post.id} className="post">
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <p><strong>Author:</strong> {post.user.name}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page <= 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={() => setPage(page + 1)} 
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PostsSection;
