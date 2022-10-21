import { useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [, setUser] = useContext(UserContext);

  async function handleSignUp(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await userbase.signUp({
        username,
        password,
        profile: { 'name': name },
        rememberMe: 'session',
      })
      setUser(user)
      setLoading(false)
      Router.push('/');
    } catch (e) {
      setLoading(false)
      setError(e.message)
    }
  }

  return (
    <form className="bg-white mt-32 p-8">
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center p-0">
          <span className="font-bold cursor-pointer text-4xl">
            Here We Go!
          </span>
        </div>
      </div>
      <div className="mb-4 mt-8">
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
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Your Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          min="1" 
          max="12"
          placeholder="MM"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <p className='text-2xl'>/</p>
        <input
          className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="day"
          type="number"
          min="1" 
          max="31"
          placeholder="DD"
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
        <p className='text-2xl'>/</p>
        <input
          className="shadow appearance-none border rounded w-28 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="year"
          type="number"
          min="1970" 
          max="2022"
          placeholder="YYYY"
          value={year}
          onChange={(e) => setYear(e.target.value)}
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
            <span className="font-bold cursor-pointer text-2xl">
              &larr; Back
            </span>
        </Link>
        </div>
      </div>
    </form>
  )
}

export default SignUp;
