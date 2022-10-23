import React, { useContext} from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../lib/magic';

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [userExtra, setUserExtra] = useContext(UserContextExtra);

  async function logOut() {
    try {
      Router.push('/loading');
      if (magic.user.isLoggedIn()) {
        await magic.user.logout()
        setUserExtra()
      }
      await userbase.signOut()
      setUser()
      Router.push('/');
    } catch (e) {
      console.error(e.message)
    }
  }
  
  return user ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container mx-auto mt-16 justify-center">
        <h3 className="font-bold text-4xl">
          <span className="bg-yellow-400">{user.profile.fname} {user.profile.lname}</span>
        </h3>
        <nav className="container mx-auto flex justify-center">
          <ul className="flex justify-end items-center p-1">
            <li>
              <button className="btn-yellow mx-2" onClick={logOut}>
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  ) : (
    <>
    </>
  )
}

export default Profile
