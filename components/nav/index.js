import React from 'react';
import Link from 'next/link'
import { IoPersonOutline, IoPerson, IoCalendarOutline, IoCalendar, IoHome, IoHomeOutline, IoGiftOutline, IoGift } from "react-icons/io5";
import Router from 'next/router';

export default function Nav() {
  return (
    <nav className="w-full h-20 fixed bg-white opacity-90 left-0 bottom-0 flex justify-center items-center border-t border-stone-700">
      <ul className="inline-flex -mt-8 space-x-2">
        <li>
          <Link href="/">
            <button className="btn-white mx-4 text-3xl">
              {Router.pathname === "/" ? (
                <IoHome />
              ) : (
                <IoHomeOutline />
              )}
            </button>
          </Link>
        </li>
        <li>
          <Link href="/calendar">
            <button className="btn-white mx-4 text-3xl">
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
            <button className="btn-white mx-4 text-3xl">
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
            <button className="btn-white mx-4 text-3xl">
              {Router.pathname === "/profile" ? (
                <IoPerson />
              ) : (
                <IoPersonOutline />
              )}
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
