import { useState, useEffect } from 'react'
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Head from 'next/head'
import userbase from 'userbase-js'
import Layout from '../components/layout'
import { magic } from '../lib/magic';
import '../styles/index.css'
import Router from 'next/router';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState()
  const [userExtra, setUserExtra] = useState()

  useEffect(() => {
    setUp()
  }, [])

  async function setUp() {
    Router.push('/loading');
    const sessionUserbase = await userbase.init({ appId: process.env.NEXT_PUBLIC_USERBASE_APP_ID })
    const magicSession = await magic.user.isLoggedIn();
    if (magicSession && sessionUserbase.user) {
      setUserExtra(magic.user.getMetadata());
      setUser(sessionUserbase.user);
    }
    else if (!magicSession && sessionUserbase.user) {
      setUserExtra();
      setUser(sessionUserbase.user);
    }
    else if (magicSession && !sessionUserbase.user) {
      setUser();
      // logout Magic
      await magic.user.logout()
      setUserExtra();
    }  
    Router.push('/');
  }

  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, user-scalable=no" /> 
      <title>TBA</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    </Head>
    <UserContext.Provider value={[user, setUser]}>
      <UserContextExtra.Provider value={[userExtra, setUserExtra]}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextExtra.Provider>
    </UserContext.Provider>
    </>
  )
}

export default MyApp
