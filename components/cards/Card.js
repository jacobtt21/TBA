import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { IoChevronForward } from "react-icons/io5";

export default function Card({ FriendID }) {
  const [reqUser, setReqUser] = useState()
  const [postID, setPostID] = useState('')
  const [numWishes, setNumWishes] = useState(-1)
  const [topImage, setTopImage] = useState('')

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
    if (JSON.parse(dataPost["wishes"]).length > 0) {
      setTopImage(JSON.parse(dataPost["wishes"])[JSON.parse(dataPost["wishes"]).length - 1]["card"])
    }
    setNumWishes(JSON.parse(dataPost["wishes"]).length)
  }

  return reqUser && postID && numWishes >= 0 ? (
    <div>
      <Link href={{pathname: '/post/[id]', query: { id: postID }}}>
        <div className="rounded-lg mt-4 justify-center bg-gray-50 text-left p-4 shadow">
          {numWishes === 0 ? (
            <>
              <div className='container flex text-left px-4 py-4'>
                <div className='w-12 h-12 align-middle mr-4'>
                  <img className='w-12 h-12 rounded-full border' src={reqUser.profilePic} />
                </div>
                <div>
                  <h1 className='font-bold'>{reqUser.fname} {reqUser.lname}</h1>
                  <h2 className='text-sm'>@{reqUser.username}</h2>
                </div>
              </div>
              <h1 className='text-2xl px-4 font-bold'>Happy Birthday {reqUser.fname}!</h1>
              <div className="px-4 mt-4 flex items-center">
                Wish Derek <IoChevronForward />
              </div>
            </>
          ) : (
            <>
              <div className='bg-yellow-400 absolute w-20 h-12 rotate-[50deg] -mt-2 right-2 rounded shadow'>
                &nbsp;
              </div>
              <div className='bg-indigo-400 absolute w-20 h-12 -mt-2 rotate-[25deg] right-2 rounded shadow'>
                &nbsp;
              </div>
              <div className='bg-blue-400 absolute w-20 h-12 -mt-2 rotate-[38deg] right-2 rounded shadow'>
                <img className='w-full h-full rounded' src={topImage} />
              </div>
              <div className='container flex text-left py-4 px-4'>
                <div className='w-12 h-12 align-middle mr-4'>
                  <img className='w-12 h-12 rounded-full border' src={reqUser.profilePic} />
                </div>
                <div>
                  <h1 className='font-bold'>{reqUser.fname} {reqUser.lname}</h1>
                  <h2 className='text-sm'>@{reqUser.username}</h2>
                </div>
              </div>
              <h1 className='text-2xl px-4 font-bold'>Happy Birthday {reqUser.fname}!</h1>
              {numWishes === 1 ? (
                <div className="px-4 mt-4 flex items-center">
                View wish <IoChevronForward />
              </div>
              ) : (
                <div className="px-4 mt-4 flex items-center">
                View all {numWishes} wishes <IoChevronForward />
              </div>
              )}
            </>
          )}
        </div>
      </Link>
    </div>
  ) : (
    <>
    </>
  )
}