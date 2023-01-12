import React from 'react';
import UserCard from './UserCard';
import Skeleton from './Skeleton';

export default function UserGrid({ feed, loading }) {
  return (
    <div className="w-4/5 md:w-1/2 mx-auto">
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
              <UserCard FriendID={friend} />
            </div>
          );
        })
      ) : (
        <h3 className="text-center mt-16 text-2xl">
          No Birthday Posts!
        </h3> 
      )}
    </div>
  )
}