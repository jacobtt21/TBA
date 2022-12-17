import React, { useContext, useEffect, useState} from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import { magic } from '../lib/magic';

function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [, setUserExtra] = useContext(UserContextExtra);
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

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

  console.log(user)
  const getTimeUntil = () => {
    // change to user b-day
    const today = new Date()
    var time;
    var todayBday = false;
    if (today.getDate() > 18 && today.getMonth() >= 11) {
      time = Date.parse("12/18/"+parseInt(today.getFullYear() + 1)) - Date.parse(today);
    }
    else if (today.getDate() < 18 && today.getMonth() <= 11) {
      time = Date.parse("12/18/"+today.getFullYear()) - Date.parse(today);

    }
    else if (today.getDate() === 18 && today.getMonth() === 11) {
      todayBday = true;
    }

    if (todayBday) {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      setDays(0);
    }
    else {
      setSeconds(Math.floor((time/1000) % 60));
      setMinutes(Math.floor((time/1000/60) % 60));
      setHours(Math.floor((time/(1000*60*60)% 24)));
      setDays(Math.floor((time/(1000*60*60*24))));
    }
  }

  useEffect(() => {
    getTimeUntil();
  })

  useEffect(() => {
    setInterval(() => getTimeUntil(), 1000)
  }, [])
  
  return user ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container mx-auto mt-16 justify-center">
        <div className="bg-gray-100 p-4 left-0 mt-4 rounded-lg">
          <div className='container text-2xl mx-auto flex justify-center' >
            Birthday Countdown
          </div>
          <nav className="container text-2xl mt-4 mx-auto flex justify-center">
            <ul className='mx-2'>
              <h3 className="block text-sm font-bold mb-2">
                Days
              </h3>
              <div className="bg-gray-300 p-2 left-0 flex justify-center rounded">
                <h3>
                  {days}
                </h3>
              </div>
            </ul>
            <ul className='mx-2'>
              <h3 className="block text-sm font-bold mb-2">
                Hours
              </h3>
              <div className="bg-gray-300 p-2 left-0 flex justify-center rounded">
                <h3>
                  {hours}
                </h3>
              </div>
            </ul>
            <ul className='mx-2'>
              <h3 className="block text-sm font-bold mb-2">
                Minutes
              </h3>
              <div className="bg-gray-300 p-2 left-0 flex justify-center rounded">
                <h3>
                  {minutes}
                </h3>
              </div>
            </ul>
            <ul className='mx-2'>
              <h3 className="block text-sm font-bold mb-2">
                Seconds
              </h3>
              <div className="bg-gray-300 p-2 left-0 flex justify-center rounded">
                <h3>
                  {seconds}
                </h3>
              </div>
            </ul>
          </nav>
        </div>
        <h1 className="font-bold text-4xl mt-4 w-full left-0">
          {user.profile.fname} {user.profile.lname}
        </h1>
        <h2 className="text-2xl w-full left-0">
          @{user.username}
        </h2>
        <nav className="container mx-auto mt-4 flex justify-center">
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
