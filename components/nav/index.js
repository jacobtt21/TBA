import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../lib/UserContext';
import Link from 'next/link'
import { IoPersonOutline, IoPerson, IoCalendarOutline, IoCalendar, IoHome, IoHomeOutline, IoGiftOutline, IoGift, IoSearch, IoSearchOutline } from "react-icons/io5";
import Router from 'next/router';

export default function Nav() {
  const [user] = useContext(UserContext);
  const [friendNotification, setFriendNotification] = useState(false)

  useEffect(() => {
    getNotifications()
  }, [])

  useEffect(() => {
    try {
      setInterval(() => getNotifications(), 10000)
    } catch (e) {
      setFriendNotification(false)
    }
  }, [])

  const getNotifications = async () => {
    try {
      const notificationData = new FormData
      notificationData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/notify_friend', {
        method: "POST",
        body: notificationData
      })
      const data = await res.json();
      setFriendNotification(data["friend_waiting"])
    } catch (e) {
      setFriendNotification(false)
    }
  }


  return (
    <nav className="w-full h-20 fixed bg-white left-0 bottom-0 flex justify-center items-center border-t border-stone-700">
      <ul className="inline-flex -mt-8 space-x-2">
        <li>
          <Link href="/">
            <button className="btn-white mx-1 text-3xl">
              {Router.pathname === "/" ? (
                <IoHome />
              ) : (
                <IoHomeOutline />
              )}
            </button>
          </Link>
        </li>
        <li>
          <Link href="/search">
            <button className="btn-white mx-1 text-3xl">
              {Router.pathname === "/search" ? (
                <IoSearch />
              ) : (
                <IoSearchOutline />
              )}
            </button>
          </Link>
        </li>
        <li>
          <Link href="/calendar">
            <button className="btn-white mx-1 text-3xl">
              {Router.pathname === "/calendar" ? (
                <IoCalendar />
              ) : (
                <IoCalendarOutline />
              )}
            </button>
          </Link>
        </li>
        <li>
          <Link href="/wallet">
            <button className="btn-white mx-1 text-3xl">
              {Router.pathname === "/wallet" ? (
                <IoGift />
              ) : (
                <IoGiftOutline />
              )}
            </button>
          </Link>
        </li>
        <li>
          <Link href="/profile">
              <button className="btn-white flex mx-1 text-3xl">
                {Router.pathname === "/profile" ? (
                  <IoPerson />
                ) : (
                  <IoPersonOutline />
                )}
                {friendNotification && (
                  <span className="absolute px-1 py-1 bg-red-600 rounded-full"></span>
                )}
              </button>            
          </Link>
        </li>
      </ul>
    </nav>
  )
}
