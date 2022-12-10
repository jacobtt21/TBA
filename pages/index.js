import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link'
import Grid from '../components/cards/Grid';

function Index() {
  const [user] = useContext(UserContext);
  const [feed, setFeed] = useState("");
  const [animateHeader, setAnimateHeader] = useState(false);

  useEffect(() => {
    if (!user) {
      return
    }
    getFeed();
  }, [user]);

  useEffect(() => {
    const listener = () => {
     if (window.scrollY > 140) {
       setAnimateHeader(true);
     } else setAnimateHeader(false);
    };
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  }, []);

  const getFeed = async () => {
    let data = ["odd", "even", "odd", "even", "odd", "even", "odd", "even", "odd", "even", "odd", "even", "odd", "even", "odd", "even"];
    setFeed(data);
  }
  
  return user ? (
    <div className="w-full md:w-1/2 mx-auto">
      <div className="w-full h-12 fixed left-0 top-0 flex bg-white">
        &nbsp;
      </div>
      <div className={`w-full h-24 fixed left-0 top-0 p-4 flex bg-white justify-center items-center trasition-all ease-in-out duration-500 ${
      animateHeader && "opacity-0"}`}
      >
        <h3 className="font-bold mt-12 text-3xl">The Birthday App</h3>
      </div>
      <div className="w-full mt-28 mb-28 flex justify-center items-center">
        {feed.length > 0 ? (
          <Grid feed={feed} />
        ) : (
          <h3 className="text-2xl">Can't seem to find anything for ya!</h3>
        )}
      </div>
    </div>
  ) : (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="container mt-16 flex justify-center">
        <h3 className="font-bold flex flex-wrap justify-center text-7xl">
          The Birthday App
        </h3>
      </div>
      <div className="container flex -mt-16 justify-center">
        <img
        src="https://raw.githubusercontent.com/Oustro/OustroImages/main/people.png"
        className="pt-20 w-72"
        alt="..."
        />
      </div>
      <nav className="container mx-auto flex justify-center">
        <ul className="flex justify-end items-center p-1">
          <li>
            <Link href="/login">
              <button className="font-bold mx-2 text-2xl" >
                Log In
              </button>
            </Link>
          </li>
          <li>
            <Link href="/signup">
              <button className="btn-yellow mx-2 text-2xl" >
                Sign Up
              </button>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex mt-28 flex-wrap justify-center">
        <img
        src="https://www.oustro.xyz/oustro_logo_b.svg"
        className="w-28"
        alt="..."
        />
      </div>
    </div>
  )
}

export default Index
