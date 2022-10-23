import React from 'react';
import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="w-full h-24 fixed left-0 bottom-0 flex justify-center items-center">
      <ul className="inline-flex -mt-4 space-x-2">
        <li>
          <button className="btn-yellow mx-2">
            Feed
          </button>
        </li>
        <p className='text-3xl'>|</p>
        <li>
          <button className="btn-yellow mx-2">
            Search
          </button>
        </li>
        <p className='text-3xl'>|</p>
        <li>
          <Link href="/profile">
            <button className="btn-yellow mx-2">
              Profile
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
