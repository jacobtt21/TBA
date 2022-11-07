import React from 'react';
import Link from 'next/link'
import { IoPersonOutline, IoPerson, IoSearchCircleOutline, IoSearchCircle, IoHome, IoHomeOutline, IoWalletOutline, IoWallet } from "react-icons/io5";
import Router from 'next/router';

export default function Nav() {
  return (
    <nav className="w-full h-20 fixed bg-white opacity-95 left-0 bottom-0 flex justify-center items-center border-t border-stone-700">
      <ul className="inline-flex -mt-8 space-x-2">
        <li>
          <Link href="/">
            <button className="btn-white mx-2 text-3xl">
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
            <button className="btn-white mx-2 text-3xl">
              {Router.pathname === "/search" ? (
                <IoSearchCircle />
              ) : (
                <IoSearchCircleOutline />
              )}
            </button>
          </Link>
        </li>
        <li>
          <Link href="/wallet">
            <button className="btn-white mx-2 text-3xl">
              {Router.pathname === "/wallet" ? (
                <IoWallet />
              ) : (
                <IoWalletOutline />
              )}
            </button>
          </Link>
        </li>
        <li>
          <Link href="/profile">
            <button className="btn-white mx-2 text-3xl">
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
