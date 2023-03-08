import Nav from '../nav'
import { useContext } from 'react';
import { UserContext } from '../../lib/UserContext';
import Router from 'next/router';

export default function Layout({ children }) {
  const [user] = useContext(UserContext)

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
