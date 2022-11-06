import React, { useContext} from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../lib/magic';

function Wallet() {
  const [user, setUser] = useContext(UserContext);
  const [userExtra, setUserExtra] = useContext(UserContextExtra);
  
  return user ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container mt-16 flex justify-center">
        <h3 className="font-bold text-4xl">
          <span className="bg-yellow-400">{user.profile.fname} {user.profile.lname}</span>
        </h3>
      </div>
    </div>
  ) : (
    <>
    </>
  )
}

export default Wallet
