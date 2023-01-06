import React, { useEffect, useState} from 'react';

export default function Countdown({ user }) {
  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    getTimeUntil();
  })

  useEffect(() => {
    setInterval(() => getTimeUntil(), 1000)
  }, [])
  

  const getTimeUntil = () => {
    // change to user b-day
    const today = new Date()
    var time;
    var todayBday = false;
    if (today.getDate() > parseInt(user.day) && today.getMonth() >= (parseInt(user.month) - 1)) {
      time = Date.parse(user.month+"/"+user.day+"/"+parseInt(today.getFullYear() + 1)) - Date.parse(today);
    }
    else if (today.getDate() < parseInt(user.day) && today.getMonth() <= (parseInt(user.month) - 1)) {
      time = Date.parse(user.month+"/"+user.day+"/"+today.getFullYear()) - Date.parse(today);

    }
    else if (today.getDate() === parseInt(user.day) && today.getMonth() === (parseInt(user.month) - 1)) {
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

  return user && (
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
  )
}