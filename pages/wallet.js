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
      currentGiftData.append("uid", '{"$oid":"'+JSON.parse(data["user_info"])["_id"]["$oid"]+'"}')
      const resGift = await fetch('http://127.0.0.1:5000/get_gifts_and_wishes', {
        method: "POST",
        body: currentGiftData
      })
      const dataGift = await resGift.json();
      setReqGift(JSON.parse(dataGift["giftsAndWishes"]))
      setLoading(false)
    } catch (e) {
      setReqUser(false)
      setInterval(setErrorOccured(true), 5000);
    }
  }
  
  return user && reqUser && reqGift ? (
    <div className='bg-scroll bg-contain fixed overflow-auto h-screen w-full no-scrollbar bg-more'>
      <div className="container mx-auto w-11/12 mt-16 justify-center mb-32">
          <div className='w-full fixed bg-white opacity-90 pt-16 top-0 z-20 shadow left-0 top-0 justify-center items-center'>
            <h1 className="font-bold text-4xl pb-2 text-center w-full">Wallet</h1>
            <h2 className="text-7xl text-center mt-8">{reqUser.points}</h2>
            <h3 className='text-2xl pb-2 text-center'>Birthday Points</h3>
          </div>
          <div className='mt-72'>
          {reqGift.length == 0 ? (
            <>
              No Gifts
            </>
          ) : reqGift.length === 1 ? (
            <>
              <div className="flex relative overflow-x-scroll no-scrollbar pb-4">
                <button className='btn-yellow'>
                  {reqGift[0]["year"]}
                </button>
              </div>
              <Grid gifts={reqGift[0]["items"]} loading={loading} />
            </>
          ) : (
            reqGift.slice(0).reverse().map((gift, i) => {
              return (
                <div className="pl-2">
                  <button className='btn-yellow'>
                    {gift["year"]}
                  </button>
                </div>
              );
            }))
          }

          </div>
      </div>
    </div>
  ) : (
    <>
    </>
  )
}

export default Wallet
