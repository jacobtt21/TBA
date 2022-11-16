import Nav from '../nav'
import { useContext } from 'react';
import { UserContext, UserContextExtra } from '../../lib/UserContext';
import Router from 'next/router';

export default function Layout({ children }) {
  const [user] = useContext(UserContext)
  const [userExtra] = useContext(UserContextExtra)
  return (
    <div>
      {children}
      {user &&  (
        <>
          {Router.pathname !== "/onboard" && (
            <Nav />
          )}
        </>
      )}
    </div>
  )
}
