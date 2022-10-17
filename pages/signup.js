import { useState, useContext } from 'react';
import { UserContext } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
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
    <form className="bg-white shadow-md rounded-xl p-8">
      <div className="mb-4">
        <label
          className="block text-purple-700 text-sm font-bold mb-2"
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
          className="block text-purple-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-purple-700 text-sm font-bold mb-2"
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
      <div className="flex items-center justify-between">
        <Link href="/">
          <span className="font-bold cursor-pointer">
            Cancel
          </span>
        </Link>
        <button
          disabled={loading}
          className="btn-yellow"
          onClick={handleSignUp}
        >
          {loading ? 'Signing Up ...' : 'Sign Up'}
        </button>
      </div>
      <p className="text-red-500 pt-10 font-bold">{error}</p>
    </form>
  )
}

export default SignUp;
