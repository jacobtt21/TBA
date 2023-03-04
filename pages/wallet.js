import React, { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Grid from '../components/gifts/Grid';

function Wallet() {
  const [user] = useContext(UserContext);
  const [errorOccured, setErrorOccured] = useState(false)
  const [reqUser, setReqUser] = useState()
  const [reqGift, setReqGift] = useState()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    getUserInfo()
  }, [])

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

      const currentGiftData = new FormData
      currentGiftData.append("cid", '{"$oid":"'+JSON.parse(data["user_info"])["_id"]["$oid"]+'"}')
      const resGift = await fetch('http://127.0.0.1:5000/get_gifts', {
        method: "POST",
        body: currentGiftData
      })
      const dataGift = await resGift.json();
      setReqGift(JSON.parse(dataGift["giftList"]))
      console.log(JSON.parse(dataGift["giftList"]))
      setLoading(false)
    } catch (e) {
      setReqUser(false)
      setInterval(setErrorOccured(true), 5000);
    }
  }
  
  return user && reqUser ? (
    <div className="w-11/12 md:w-1/2 mx-auto">
      <div className="container mx-auto mt-16 justify-center">
        <h1 className="font-bold text-4xl mt-4 text-center w-full">
          Wallet
        </h1>
        <h2 className="text-7xl text-center mt-8">{reqUser.points}</h2>
        <h3 className='text-2xl text-center'>Birthday Points</h3>
      </div>
      <Grid gifts={reqGift} loading={loading} />
    </div>
  ) : (
    <>
    </>
  )
}

export default Wallet
