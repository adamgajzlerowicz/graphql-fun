import React, {useEffect} from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import {Post, PostWhereInput} from '../../database/generated';

const EXCHANGE_RATES = gql`
  {
    posts {
      id
      text
    }
  }
`;


const SUB = gql`
  subscription newPosts {
    post(where: {
      mutation_in: [CREATED]
    }) {
      mutation
      node {
        text
      }
    }
  }`;

export default function App() {
  const { loading, error, data, refetch } = useQuery<{posts: Post[]}, PostWhereInput>(EXCHANGE_RATES);
  const sub = useSubscription(SUB)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [sub])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data) {
   return null
  }


  return (data?.posts || []).map((post: any) => (
    <div key={post.id}>
      <p>
        {post.id}: {post.text}
      </p>
    </div>
  ));
}

