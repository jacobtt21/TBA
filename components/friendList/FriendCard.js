import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { IoChevronForward } from "react-icons/io5";

export default function FriendCard({ FriendID }) {
  const [reqUser, setReqUser] = useState()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const currentUserData = new FormData
    currentUserData.append("cid", '{"$oid":"'+FriendID["from"]["$oid"]+'"}')
    const resUser = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/get_id_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))
  }

  return reqUser ? (
    <div>
      <Link href={{pathname: '/u/[id]', query: { id: reqUser.username }}}>
      <div className='container bg-gray-100 rounded-lg flex text-left px-4 py-4'>
        <div className='w-12 h-12 align-middle mr-2'>
          <img className='w-12 h-12 object-fit rounded-full border' src={reqUser.profilePic} />
        </div>
        <div>
          <h1 className='font-bold'>{reqUser.fname} {reqUser.lname}</h1>
          <h2 className='text-sm'>@{reqUser.username}</h2>
        </div>
      </div>
      </Link>
    </div>
  ) : (
    <>
    </>
  )
}