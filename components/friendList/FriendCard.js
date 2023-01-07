import React, { useContext, useState, useEffect } from 'react';
import Link from 'next/link'

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
        <h2 className="text-2xl w-full mt-2 left-0">
          @{reqUser.username}
        </h2>
      </Link>
    </div>
  ) : (
    <>
    </>
  )
}