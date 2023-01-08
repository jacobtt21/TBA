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
    const resUser = await fetch('http://127.0.0.1:5000/get_id_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))
  }

  return reqUser ? (
    <div>
      <Link href={{pathname: '/u/[id]', query: { id: reqUser.username }}}>
        <div className='container mt-4 flow-root items-center bg-gray-200 py-2 px-4 rounded-lg'>
          <div className='float-left'>
            <h2 className="text-2xl">
              @{reqUser.username}
            </h2>
          </div>
          <div className='float-right'>
            <h2 className="text-3xl">
              <IoChevronForward />
            </h2>
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <>
    </>
  )
}