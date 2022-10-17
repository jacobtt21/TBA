import { useState, useEffect } from 'react'
import { UserContext } from '../lib/UserContext';
import userbase from 'userbase-js'
import Layout from '../components/layout'

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()

  useEffect(() => {
    userbase.init({ appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID })
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>

  )
}

export default MyApp
