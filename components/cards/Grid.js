import React from 'react';
import Card from './Card';

export default function Grid({ feed }) {
  return (
    <>
      {feed.length !== 0 ? (
        <div className="w-4/5 md:w-1/2 mx-auto">
          {feed.slice(0).reverse().map((friend, i) => {
            return (
              <div key={i}>
                <Card FriendID={friend} />
              </div>
            );
          })}
        </div>
      ) : (
        <>
        </>
      )}
    </>
  )
}