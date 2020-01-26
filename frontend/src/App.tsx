import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
// import {Post, PostWhereInput} from '../../api/src/prisma';

const EXCHANGE_RATES = gql`
  {
    posts {
      id
      text
    }
  }
`;

export default function App() {
  // const { loading, error, data } = useQuery<Post[], PostWhereInput>(EXCHANGE_RATES);
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) {
   return null
  }


  // @ts-ignore
  return (data.posts || []).map((post: Post) => (
    <div key={post.id}>
      <p>
        {post.id}: {post.text}
      </p>
    </div>
  ));
}

