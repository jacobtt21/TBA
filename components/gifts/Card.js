import React, { useState, useEffect } from 'react';
import { Browser } from '@capacitor/browser';

export default function Card({ gift }) {
  const [src, setSrc] = useState(gift[0]["card"]);
  const [reqUser, setReqUser] = useState('')

  useEffect(() => {
    getWishInfo()
  }, [])

  const getWishInfo = async () => {
    const currentUserData = new FormData
    currentUserData.append("cid", '{"$oid":"'+gift[0]["sender"]["$oid"]+'"}')
    const resUser = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/get_id_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))
  }

  const openCard = async () => {
    await Browser.open({ url: gift[1]["url"] });
  };

  const doNothing = async () => {
    console.log("nothing")
  };

  return reqUser && (
    <div className="bg-gray-50 mt-4 rounded overflow-hidden shadow-lg" onClick={gift.length > 1 ? openCard : doNothing}>
      {gift.length > 1 && (
        <img className='h-18 w-20 absolute right-2 rounded shadow rotate-[30deg]' src={gift[1]["image"]} />
      )}
      <div className="px-6 py-4">
        <div className='container flex text-left'>
          <div className='w-12 h-12 align-middle mr-2'>
            <img className='w-12 h-12 rounded-full border' src={reqUser.profilePic} />
          </div>
          <div>
            <h1 className='font-bold'>{reqUser.fname} {reqUser.lname}</h1>
            <h2 className='text-sm'>@{reqUser.username}</h2>
          </div>
        </div>
        <p className="text-gray-700 mt-4 text-base">{gift[0]["message"]}</p>
      </div>
      <img className="w-full shadow h-48" src={src} onError={() => setSrc('https://github.com/Oustro/OustroImages/blob/main/error.png?raw=true')}/>
    </div>
  )
}