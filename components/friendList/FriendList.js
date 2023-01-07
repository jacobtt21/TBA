import React from 'react';
import FriendCard from './FriendCard';

export default function FriendList({ list }) {
  return (
    <div className="w-4/5 md:w-1/2 mx-auto">
      {list.map((friend, i) => {
        return (
          <div key={i}>
            <FriendCard FriendID={friend} />
          </div>
        );
      })}
    </div>
  )
}