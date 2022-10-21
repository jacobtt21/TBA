import TodoForm from '../components/todo-form'
import React, { useEffect, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link'

function Index() {
  const [user] = useContext(UserContext);
  
  return user ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <h3 className="font-bold text-4xl">
        Welcome, <span className="bg-yellow-400">{user.profile.name}</span>!
      </h3>
      <TodoForm />
    </div>
  ) : (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container pt-44 flex justify-center">
        <h3 className="font-bold flex flex-wrap justify-center text-7xl">
          The Birthday App
        </h3>
      </div>
      <nav className="container pt-10 mx-auto flex justify-center">
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
      <div class="flex pt-36 flex-wrap justify-center">
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
