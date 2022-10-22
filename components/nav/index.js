import React, { useContext} from 'react';
import { UserContext, UserContextExtra } from '../../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../../lib/magic';

export default function Nav() {
  const [user, setUser] = useContext(UserContext);
  const [userExtra, setUserExtra] = useContext(UserContextExtra);

  async function logOut() {
    try {
      await userbase.signOut()
      setUser()
      if (magic.user.isLoggedIn()) {
        await magic.user.logout()
        setUserExtra()
      }
      Router.push('/');
    } catch (e) {
      console.error(e.message)
    }
  }

  return (
    <nav className="container pt-10 mx-auto flex justify-center">
      <ul className="flex justify-end items-center p-8">
        <li>
          <button className="btn-yellow mx-2" onClick={logOut}>
            Log Out!
          </button>
        </li>
      </ul>
    </nav>
  )
}
