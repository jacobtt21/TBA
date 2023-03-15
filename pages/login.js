import { useState, useContext } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../lib/magic';
import { IoChevronBack } from "react-icons/io5";
import { IoEyeOff, IoEyeOutline } from "react-icons/io5";

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [userbaseAuth, setUserbaseAuth] = useState(false)
  const [, setUser] = useContext(UserContext);
  const [, setUserExtra] = useContext(UserContextExtra);

  const [showPassword, setShowPassword] = useState(false)

  async function handleLogIn(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const user = await userbase.signIn({
        username,
        password,
        rememberMe: 'local',
      })
      setUserbaseAuth(true)
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
        setUser(user)
        setLoading(false)
        Router.push('/');
      }
    } catch (e) {
      if (userbaseAuth) {
        await userbase.signOut()
      }
      setLoading(false)
      setError(e.message)
    }
  }

  return (
    <div className="bg-hero h-screen p-8">
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center p-0">
          <span className="font-bold mt-32 cursor-pointer text-4xl">
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
          className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
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
          htmlFor="password"
        >
          Password
        </label>
        <div className="relative">
          <input
          className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="*******"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pl-3">
            <button className='btn-white' onClick={() => setShowPassword(o => !o)}>
              {showPassword ? (
                <IoEyeOff />
              ) : (
                <IoEyeOutline />
              )}
            </button>
          </div>
        </div>
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
            <button disabled={loading} className="btn-white flex items-center text-2xl">
              <IoChevronBack /> Go Back
            </button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;
