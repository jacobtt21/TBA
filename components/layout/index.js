import Nav from '../nav'
import { useState, useContext } from 'react';
import { UserContext, UserContextExtra } from '../../lib/UserContext';

export default function Layout({ children }) {
  const [user] = useContext(UserContext)
  const [userExtra] = useContext(UserContextExtra)
  return (
    <div>
      {children}
      {user && (
        <Nav />
      )}
    </div>
  )
}
