import { useState, useContext } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../lib/magic';

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [, setUser] = useContext(UserContext);
  const [, setUserExtra] = useContext(UserContextExtra);

  async function handleLogIn(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await userbase.signIn({
        username,
        password,
        rememberMe: 'local',
      })
      setUser(user)
      const DID = await magic.auth.loginWithSMS({
        phoneNumber: '+1'+user.profile.phoneNumber,
      });
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + DID,
        },
      });
      if (res.status === 200) {
        setUserExtra(await magic.user.getMetadata());
        setLoading(false)
        Router.push('/');
      }
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
            Welcome Back
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
            onClick={handleLogIn}
          >
            {loading ? 'Logging In ...' : 'Log In'}
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

export default Login;
