import Nav from '../nav'
import { useState, useContext } from 'react';
import { UserContext } from '../../lib/UserContext';

export default function Layout({ children }) {
  const [user] = useContext(UserContext);
  return (
    <div>
      {children}
      {user && (
        <Nav />
      )}
    </div>
  )
}
