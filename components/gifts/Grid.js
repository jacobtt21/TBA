import React from 'react';
import Card from './Card';
import Skeleton from './Skeleton';

export default function Grid({ gifts, loading }) {
  return (
    <div className="w-5/5 mt-4 md:w-1/2 mx-auto">
      {loading ? (
        Array(20).fill(0).map((_, i) => {
          return (
            <div key={i}>
              <Skeleton />
            </div>
          );
        })
      ) : gifts.length > 0 ? (
        gifts.slice(0).reverse().map((gift, i) => {
          return (
            <div key={i}>
              <Card gift={gift} />
            </div>
          );
        })
      ) : (
        <h3 className="text-center mt-16 text-2xl">
          No gifts found!
        </h3> 
      )}
    </div>
  )
}