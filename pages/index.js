import React, { useEffect, useContext, useState } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Link from 'next/link'

function Index() {
  const [user] = useContext(UserContext);
  const [userExtra] = useContext(UserContextExtra);
  
  return user ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container mt-16 flex justify-center">
        <h3 className="font-bold text-4xl">
          Welcome, <span className="bg-yellow-400">{user.profile.fname}</span>!
          {userExtra ? (
            <>
              <h3 className="text-2xl">Crypto Capabilties Active</h3>
            </>
          ) : (
            <>
              <h3 className="text-2xl">Crypto Capabilties Not Active</h3>
            </>
          )}
        </h3>
      </div>
    </div>
  ) : (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container mt-16 flex justify-center">
        <h3 className="font-bold flex flex-wrap justify-center text-7xl">
          The Birthday App
        </h3>
      </div>
      <div className="container flex -mt-16 justify-center">
        <img
        src="https://raw.githubusercontent.com/Oustro/OustroImages/main/people.png"
        className="pt-20 w-72"
        alt="..."
        />
      </div>
      <nav className="container mx-auto flex justify-center">
        <ul className="flex justify-end items-center p-1">
          <li>
            <Link href="/login">
              <button className="font-bold mx-2 text-2xl" >
                Log In
              </button>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <button className="btn-yellow mx-2 text-2xl" >
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex mt-28 flex-wrap justify-center">
        <img
        src="https://www.oustro.xyz/oustro_logo_b.svg"
        className="w-28"
        alt="..."
        />
      </div>
    </div>
  )
}

export default Index
