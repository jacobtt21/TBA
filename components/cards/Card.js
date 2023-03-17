import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { IoChevronForward } from "react-icons/io5";

export default function Card({ FriendID }) {
  const [reqUser, setReqUser] = useState()
  const [postID, setPostID] = useState('')
  const [numWishes, setNumWishes] = useState(-1)

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const currentUserData = new FormData
    currentUserData.append("cid", '{"$oid":"'+JSON.parse(FriendID)["recipient"]["$oid"]+'"}')
    const resUser = await fetch('http://127.0.0.1:5000/get_id_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))
    setPostID(JSON.parse(FriendID)["_id"]["$oid"])
    const currentPostData = new FormData
    currentPostData.append("pid", '{"$oid":"'+JSON.parse(FriendID)["_id"]["$oid"]+'"}')
    const resPost = await fetch('http://127.0.0.1:5000/get_wishes_by_post', {
      method: "POST",
      body: currentPostData
    })
    const dataPost = await resPost.json()
    setNumWishes(JSON.parse(dataPost["wishes"]).length)
  }

  return reqUser && postID && numWishes >= 0 ? (
    <div>
      <Link href={{pathname: '/post/[id]', query: { id: postID }}}>
        <div className="rounded-lg mt-4 justify-center text-center p-4 bg-gray-100 shadow">
          <img className='w-24 h-24 rounded-full shadow mx-auto' src={reqUser.profilePic} />
          <div className="font-bold text-xl mt-4">It's {reqUser.fname}'s Birthday!</div>
          <div className="mt-4">{numWishes === 0 ? "0 wishes" : numWishes === 1 ? "1 wish" : numWishes + "wishes"}</div>
        </div>
      </Link>
    </div>
  ) : (
    <>
    </>
  )
}