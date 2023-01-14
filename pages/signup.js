import { useState, useContext } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../lib/magic';
import algoliasearch from 'algoliasearch';
import { IoChevronBack } from "react-icons/io5";

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [, setUser] = useContext(UserContext);
  const [, setUserExtra] = useContext(UserContextExtra);

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY,
  );

  const index = searchClient.initIndex('TBA');

  async function handleSignUp(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await validateForm();
      const DID = await magic.auth.loginWithSMS({
        phoneNumber: '+1'+phoneNumber,
      });
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + DID,
        },
      });
      if (res.status === 200) {
        const userFromMagic = await magic.user.getMetadata()
        const userData = new FormData
        userData.append("uname", username)
        userData.append("fname", fname)
        userData.append("lname", lname)
        userData.append("day", day)
        userData.append("month", month)
        userData.append("year", year)
        userData.append("wallet", userFromMagic.publicAddress)
        //
        // UPDATE THE SERVER URL
        //
        const res = await fetch('http://127.0.0.1:5000/create_user', {
          method: "POST",
          body: userData
        })
        const data = await res.json();
        const user = await userbase.signUp({
          username,
          password,
          profile: { 'fname': fname, 'lname': lname, 'phoneNumber': phoneNumber, 'userID': (JSON.parse(data["user_id"])["$oid"]).toString()},
          rememberMe: 'local',
        })
        await index.saveObject({
          objectID: username,
          fname: fname,
          lname: lname,
          profilePic: "https://github.com/Oustro/OustroImages/blob/main/Untitled%20design.png?raw=true"
        })
        setUser(user)
        setUserExtra(userFromMagic);
        setLoading(false)
        Router.push('/onboard');
      }
    } catch (e) {
      setLoading(false)
      setError(e.message)
    }
  }

  async function validateForm() {
    if (fname === '' || lname === '' || month === '' || day === '' || year === '' || phoneNumber === '') {
      throw new Error('Missing Required Fields');
    }
    if (parseInt(year) > 2022) {
      throw new Error("Invalid Year");
    }
    if (parseInt(month) > 12 || parseInt(month) < 1) {
      throw new Error("Invalid Month");
    }
    // Need to refine day checks
    if (parseInt(day) > 31 || parseInt(day) < 1) {
      throw new Error("Invalid Day");
    }
  }

  return (
    <form className="bg-white mt-24 p-8">
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center p-0">
          <span className="font-bold cursor-pointer text-4xl">
            Here We Go!
          </span>
        </div>
      </div>
      <label
        className="block text-sm font-bold mb-2 mt-8"
        htmlFor="name"
      >
        Your Name
      </label>
      <div className="mb-4 inline-flex space-x-2">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="fname"
          type="text"
          placeholder="First Name"
          value={fname}
          disabled={loading}
          onChange={(e) => setFName(e.target.value)}
        />
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="lname"
          type="text"
          placeholder="Last Name"
          value={lname}
          disabled={loading}
          onChange={(e) => setLName(e.target.value)}
        />
      </div>
      <label
        className="block text-sm font-bold mb-2"
        htmlFor="month"
      >
        Your Birthday
      </label>
      <div className="mb-4 inline-flex space-x-2">
        <input
          className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="month"
          type="number"
          pattern="[0-9]*" 
          maxLength="2"
          placeholder="MM"
          value={month}
          disabled={loading}
          onChange={(e) => setMonth(e.target.value)}
        />
        <p className='text-2xl'>/</p>
        <input
          className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="day"
          type="number"
          pattern="[0-9]*" 
          maxLength="2"
          placeholder="DD"
          value={day}
          disabled={loading}
          onChange={(e) => setDay(e.target.value)}
        />
        <p className='text-2xl'>/</p>
        <input
          className="shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="year"
          type="number"
          pattern="[0-9]*" 
          maxLength="4"
          placeholder="YYYY"
          value={year}
          disabled={loading}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          disabled={loading}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="number"
        >
          Phone Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="number"
          type="number"
          pattern="[0-9]*" 
          maxLength="10"
          placeholder="1234567890"
          value={phoneNumber}
          disabled={loading}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="*******"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center pt-8">
          <button
            disabled={loading}
            className="btn-yellow text-2xl"
            onClick={handleSignUp}
          >
            {loading ? 'Signing Up ...' : 'Sign Up'}
          </button>
        </div>
      </div>
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center p-0">
          <p className="text-red-500 pt-10 font-bold">{error}</p>
        </div>
      </div>
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center p-8">
          <Link href="/">
            <button disabled={loading} className="btn-white flex items-center text-2xl">
              <IoChevronBack /> Go Back
            </button>
        </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUp;
