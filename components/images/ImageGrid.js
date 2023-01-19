import React from 'react';
import ImageCard from './ImageCard';
import Skeleton from './Skeleton';

export default function Grid({ cards, loading }) {
  return (
    <div className="w-11/12 md:w-1/2 mx-auto grid grid-cols-2 gap-4">
      {loading ? (
        Array(20).fill(0).map((_, i) => {
          return (
            <div key={i}>
              <Skeleton />
            </div>
          );
        })
      ) : cards.length > 0 ? (
        cards.map((imageCard, i) => {
          return (
            <div key={i}>
              <ImageCard card={imageCard} />
            </div>
          );
        })
      ) : (
        <h3 className="text-center mt-16 text-2xl">
          Add some friends to generate a cards!
        </h3> 
      )}
    </div>
  )
}