import React, { useContext} from 'react';
import { UserContext } from '../../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'


export default function Nav() {
  const [user, setUser] = useContext(UserContext);

  async function logOut() {
    try {
      await userbase.signOut()
      setUser();
      Router.push('/');
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <nav className="container pt-10 mx-auto flex justify-center">
      <ul className="flex justify-end items-center p-8">
        {!user ? (
          <>
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
          </>
        ) : (
          <li>
            <button className="btn-yellow mx-2" onClick={logOut}>
              Log Out
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}
