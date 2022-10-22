import { useState, useEffect } from 'react'
import { UserContext, UserContextExtra } from '../lib/UserContext';
import userbase from 'userbase-js'
import Layout from '../components/layout'
import { magic } from '../lib/magic';

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()
  const [userExtra, setUserExtra] = useState()

  useEffect(() => {
    setUp()
  }, [])

  async function setUp() {
    const sessionUserbase = await userbase.init({ appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID })
    const magicSession = await magic.user.isLoggedIn();
    if (magicSession && sessionUserbase.user) {
      setUserExtra(magic.user.getMetadata());
      setUser(sessionUserbase.user);
    }
    else if (!magicSession && sessionUserbase.user) {
      setUserExtra();
      // logout Userbase
      await userbase.signOut()
      setUser();
    }
    else if (magicSession && !sessionUserbase.user) {
      setUser();
      // logout Magic
      await magic.user.logout()
      setUserExtra();
    }  
  }

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
