import { useState, useEffect } from 'react'
import { UserContext, UserContextExtra } from '../lib/UserContext';
import userbase from 'userbase-js'
import Layout from '../components/layout'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()
  const [userExtra, setUserExtra] = useState()

  useEffect(() => {
    userbase.init({ appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID })
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <UserContextExtra.Provider value={[userExtra, setUserExtra]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextExtra.Provider>
    </UserContext.Provider>

  )
}

export default MyApp
