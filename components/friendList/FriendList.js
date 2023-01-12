import React from 'react';
import FriendCard from './FriendCard';
import Skeleton from '../cards/Skeleton';

export default function FriendList({ list, loading }) {
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
      ) : list.map((friend, i) => {
        return (
          <div key={i}>
            <FriendCard FriendID={friend} />
          </div>
        );
      })}
    </div>
  )
}