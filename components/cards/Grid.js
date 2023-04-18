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
        <div className=''>
          <h3 className="text-center mt-16 text-2xl">
            A birthday is right around the corner!
          </h3> 
          <img
          src="https://raw.githubusercontent.com/Oustro/OustroImages/937173d3970c7fa3cba5b775b8beeb7e6d7ef239/TBAlogo.svg"
          className="w-64 mx-auto mt-12 text-center"
          alt="..."
          />
        </div>
      )}
    </div>
  )
}