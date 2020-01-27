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

function Comp1() {
  const { loading, error, data, refetch } = useQuery<{posts: Post[]}, PostWhereInput>(EXCHANGE_RATES);
  const sub = useSubscription(SUB)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line
  }, [sub])

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data?.posts) {
   return null
  }

  const renderData: Post[] = data?.posts || []

  return <div>
    {renderData.map((post: Post) => (
      <div key={post.id}>
        <p>
          {post.id}: {post.text}
        </p>
      </div>
    ))}
  </div>
}

function Comp2() {
  const { loading, error, data } = useQuery<{posts: Post[]}, PostWhereInput>(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data?.posts) {
    return null
  }

  const renderData: Post[] = data?.posts || []

  return <div>
    {renderData.map((post: Post) => (
      <div key={post.id}>
        <p>
          {post.id}: {post.text}
        </p>
      </div>
    ))}
  </div>
}


export default function App() {
  return (
    <>
      <Comp1/>
      <Comp2/>
      </>
  )
}
