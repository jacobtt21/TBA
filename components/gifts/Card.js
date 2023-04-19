import React, { useState, useEffect } from 'react';
import { Browser } from '@capacitor/browser';

export default function Card({ gift }) {
  const [src, setSrc] = useState(gift[0]["card"]);
  const [reqUser, setReqUser] = useState('')
  const [reactionNum, setReactionNum] = useState(parseInt(gift[0]["reaction"]))

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
    console.log("Hi there!")
  };

  const addReaction = async (num) => {
    setReactionNum(num)
    const reactionData = new FormData
    reactionData.append("wid", '{"$oid":"'+gift[0]["_id"]["$oid"]+'"}')
    reactionData.append("reaction", num)
    const resReaction = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/add_reaction', {
      method: "POST",
      body: reactionData
    })
    const dataReaction = await resReaction.json()
  }

  return reqUser && (
    <>
      <div className="bg-gray-50 mt-4 rounded overflow-hidden shadow-lg" onClick={gift.length > 1 ? openCard : doNothing}>
        {gift.length > 1 && (
          <img className='h-18 w-20 absolute right-2 rounded shadow rotate-[30deg]' src={gift[1]["image"]} />
        )}
        <div className="px-6 py-4">
          <div className='container flex text-left'>
            <div className='w-12 h-12 align-middle mr-2'>
              <img className='w-12 h-12 object-fit rounded-full border' src={reqUser.profilePic} />
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
      <div className="flex bg-gray-50 pt-2 pb-2 rounded relative overflow-x-scroll no-scrollbar">
        <div className="">
          <button className={reactionNum === 1 ? 'btn-yellow text-2xl' : 'btn-white text-2xl'} onClick={() => addReaction(1)}>
            ❤️
          </button>
        </div>
        <div className="pl-2">
          <button className={reactionNum === 2 ? 'btn-yellow text-2xl' : 'btn-white text-2xl'} onClick={() => addReaction(2)}>
            😂
          </button>
        </div>
        <div className="pl-2">
          <button className={reactionNum === 3 ? 'btn-yellow text-2xl' : 'btn-white text-2xl'} onClick={() => addReaction(3)}>
            😊
          </button>
        </div>
        <div className="pl-2">
          <button className={reactionNum === 4 ? 'btn-yellow text-2xl' : 'btn-white text-2xl'} onClick={() => addReaction(4)}>
            😜
          </button>
        </div>
        <div className="pl-2">
          <button className={reactionNum === 5 ? 'btn-yellow text-2xl' : 'btn-white text-2xl'} onClick={() => addReaction(5)}>
            🫶
          </button>
        </div>
        <div className="pl-2">
          <button className={reactionNum === 6 ? 'btn-yellow text-2xl' : 'btn-white text-2xl'} onClick={() => addReaction(6)}>
            👍
          </button>
        </div>
        <div className="pl-2">
          <button className={reactionNum === 7 ? 'btn-yellow text-2xl' : 'btn-white text-2xl'} onClick={() => addReaction(7)}>
            🔥
          </button>
        </div>
      </div>
    </>
  )
}