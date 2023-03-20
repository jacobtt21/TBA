import React from 'react';
import WishCard from './WishCard';
import Skeleton from './Skeleton';

export default function WishGrid({ wishes, loading }) {
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
      ) : wishes.length > 0 ? (
        wishes.map((wish, i) => {
          return (
            <div key={i}>
              <WishCard PostID={wish} />
            </div>
          );
        })
      ) : (
        <h3 className="text-center mt-16 text-1xl">
          No wishes yet, why not be the first?
        </h3> 
      )}
    </div>
  )
}