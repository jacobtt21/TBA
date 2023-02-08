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
    <div className="w-11/12 md:w-1/2 mx-auto">
      <div className="container mx-auto mt-16 justify-center">
        <h1 className="font-bold text-4xl mt-4 text-center w-full">
          Wallet
        </h1>
        <h2 className="text-7xl text-center mt-8">274</h2>
        <h3 className='text-2xl text-center'>Birthday Points</h3>
      </div>
    </div>
  ) : (
    <>
    </>
  )
}

export default Wallet
