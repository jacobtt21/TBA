import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from '../lib/UserContext';
import Link from 'next/link'
import Grid from '../components/cards/Grid';
import Confetti from 'react-dom-confetti';
import Loading from './loading';

function Index() {
  const [user] = useContext(UserContext);
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true)
  const [confetti, setConfetti] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false)
  const [reqUser, setReqUser] = useState()

  useEffect(() => {
    if (!user) {
      return
    }
    getUserInfo()
    getFeed();
  }, [user]);

  const getUserInfo = async () => {
    try {
      setLoading(true)
      const currentUserData = new FormData
      currentUserData.append("uname", user.username)
      const res = await fetch('http://127.0.0.1:5000/get_username_info', {
        method: "POST",
        body: currentUserData
      })
      const data = await res.json();
      setReqUser(JSON.parse(data["user_info"]))
    } catch (e) {
      setReqUser(false)
      setInterval(setErrorOccured(true), 5000);
    }
  }

  const getFeed = async () => {
    try {
      const feedData = new FormData
      feedData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
      const resFeed = await fetch('http://127.0.0.1:5000/get_feed', {
        method: "POST",
        body: feedData
      })
      const dataFeed = await resFeed.json();
      setFeed(dataFeed["posts"])
      setLoading(false)
    } catch (e) {
      setFeed(false)
      setInterval(setErrorOccured(true), 5000);
    }
  }

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
  };
  
  return user ? (
    <>
      {reqUser && feed ? (
        <div className="bg-scroll bg-contain fixed overflow-auto h-screen w-full no-scrollbar bg-hero">
          <Confetti active={ confetti } config={ config }/>
          <div className='w-full fixed bg-white opacity-90 pt-16 top-0 z-20 shadow left-0 top-0 justify-center items-center'>
            <h1 className="font-bold text-4xl pb-2 text-center w-full">
              The Birthday App
            </h1>
          </div>
          <div className="w-full flex mt-28 justify-center items-center">
            <Grid feed={feed} loading={loading} />
          </div>
          <div className="w-full flex justify-center items-center">
            <Grid feed={feed} loading={loading} />
          </div>
          <div className="w-full mb-28 flex justify-center items-center">
            <Grid feed={feed} loading={loading} />
          </div>
        </div>
      ) : (
        <>
          {errorOccured ? (
            <div className="w-full">
              <div className="mx-auto justify-center text-center items-center">
                <h3 className="font-bold mt-16 text-2xl">
                  Server Connection Error
                </h3>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  ) : (
    <div className="h-screen fixed bg-hero bg-no-repeat overflow-hidden m-0 bg-cover bg-center bg-fixed">
      <div className="flex mx-auto w-4/5 justify-center">
        <h3 className="font-bold flex flex-wrap justify-center mt-16 text-7xl">
          The Birthday App
        </h3>
      </div>
      <div className="container flex -mt-16 justify-center">
        <img
        src="https://raw.githubusercontent.com/Oustro/OustroImages/937173d3970c7fa3cba5b775b8beeb7e6d7ef239/TBAlogo.svg"
        className="pt-20 w-72"
        alt="..."
        />
      </div>
      <nav className="container mx-auto mt-12 flex justify-center">
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
      <div className="flex mt-20 flex-wrap justify-center">
        <img
        src="https://www.oustro.xyz/oustro_logo.svg"
        className="w-28"
        alt="..."
        />
      </div>
    </div>
  )
}

export default Index
