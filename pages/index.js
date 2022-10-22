import TodoForm from '../components/todo-form'
import React, { useEffect, useContext, useState } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Link from 'next/link'

function Index() {
  const [user] = useContext(UserContext);
  const [userExtra] = useContext(UserContextExtra);
  
  return user && userExtra ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <h3 className="font-bold text-4xl">
        Welcome, <span className="bg-yellow-400">{user.profile.fname}</span>!
        Polygon Wallet <span className="bg-yellow-400">{userExtra.publicAddress}</span>!
      </h3>
      <TodoForm />
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
        <ul className="flex justify-end items-center p-8">
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
      <div className="flex flex-wrap justify-center">
        <img
        src="https://www.oustro.xyz/oustro_logo_b.svg"
        className="pt-20 w-28"
        alt="..."
        />
      </div>
    </div>
  )
}

export default Index
