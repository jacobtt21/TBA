import React, { useState, useEffect } from 'react';
import { IoAlertCircleOutline } from "react-icons/io5";


export default function WishCard({ PostID }) {
  const [reqUser, setReqUser] = useState()
  const [src, setSrc] = useState(PostID.card);

  useEffect(() => {
    getWishInfo()
  }, [])

  const getWishInfo = async () => {
    const currentUserData = new FormData
    currentUserData.append("cid", '{"$oid":"'+PostID["sender"]["$oid"]+'"}')
    const resUser = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/get_id_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))
  }

  return reqUser ? (
    <div className="bg-gray-50 mt-4 rounded overflow-hidden shadow-lg">
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
        {!PostID.privateMsg && (
          <p className="text-gray-700 mt-4 text-base">{PostID.message}</p>    
        )}
      </div>
      <img className="w-full shadow h-48" src={src} onError={() => setSrc('https://github.com/Oustro/OustroImages/blob/main/error.png?raw=true')}/>
    </div>
  ) : (
    <>
    </>
  )
}