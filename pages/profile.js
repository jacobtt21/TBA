import React, { useContext} from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../lib/magic';

function Profile() {
  const [user] = useContext(UserContext);
  const [userExtra] = useContext(UserContextExtra);

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
  
  return user && (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container mt-16 flex justify-center">
        <h3 className="font-bold text-4xl">
          <span className="bg-yellow-400">{user.profile.fname} {user.profile.lname}</span>
          <nav className="container mx-auto flex justify-center">
            <ul className="flex justify-end items-center p-1">
              <li>
              <button className="btn-yellow mx-2" onClick={logOut}>
                Log Out
              </button>
              </li>
            </ul>
          </nav>
        </h3>
      </div>
    </div>
  )
}

export default Profile
