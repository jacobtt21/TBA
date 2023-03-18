import React from 'react';
import Card from './Card';
import Skeleton from './Skeleton';

export default function Grid({ feed, loading }) {
  return (
    <div className="w-11/12 md:w-1/2 mx-auto">
      {loading ? (
        Array(20).fill(0).map((_, i) => {
          return (
            <div key={i}>
              <Skeleton />
            </div>
          );
        })
      ) : feed.length > 0 ? (
        feed.slice(0).reverse().map((friend, i) => {
          return (
            <div key={i}>
              <Card FriendID={friend} />
            </div>
          );
        })
      ) : (
        <h3 className="text-center mt-16 text-2xl">
          Add some friends to generate a feed!
        </h3> 
      )}
    </div>
  )
}