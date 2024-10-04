import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_USER_ALBUMS = gql`
  query GetUserAlbums($userId: ID!) {
    user(id: $userId) {
      albums {
        data {
          id
          title
          photos {
            data {
              id
              title
              url
              thumbnailUrl
            }
          }
        }
      }
    }
  }
`;

const Albums = ({ userId }) => {
  const { loading, error, data } = useQuery(GET_USER_ALBUMS, {
    variables: { userId }, // Pass the userId variable here
  });

  if (loading) return <p>Loading albums...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Albums</h2>
      {data.user.albums.data.map(album => (
        <div key={album.id}>
          <h3>{album.title}</h3>
          <div className="photos">
            {album.photos.data.map(photo => (
              <div key={photo.id}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <p>{photo.title}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Albums;
