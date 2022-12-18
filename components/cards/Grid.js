import React from 'react';
import Link from 'next/link'
import Router from 'next/router';

export default function Grid({ feed }) {
  return (
    <div className="w-4/5 md:w-1/2 mx-auto">
      {feed.map((item, i) => {
        return (
          <div className="container mt-4 flex justify-center bg-gray-200 py-2 px-4 rounded-lg" key={i}>
            <h3 className="text-2xl">
              {item} - test data
            </h3>
          </div>
        );
      })}
    </div>
  )
}
