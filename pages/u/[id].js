import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../lib/UserContext';
import { useRouter } from 'next/router'
import Countdown from '../../components/countdown/Countdown'
import UserGrid from '../../components/cards/UserGrid';
import { IoChevronBack } from "react-icons/io5";
import { Transition } from '@headlessui/react'

function UserPage() {
  const [user] = useContext(UserContext)
  const [reqUser, setReqUser] = useState()
  const [loading , setLoading] = useState(true)
  const [friendStatus, setFriendStatus] = useState(0)
  const [feed, setFeed] = useState([])
  const router = useRouter();

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    setLoading(true)
    const currentUserData = new FormData
    currentUserData.append("uname", router.query.id)
    const resUser = await fetch('http://127.0.0.1:5000/get_username_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))

    const friendStatusData = new FormData
    friendStatusData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    friendStatusData.append("oid", '{"$oid":"'+JSON.parse(data["user_info"])["_id"]["$oid"]+'"}')
    const resFriend = await fetch('http://127.0.0.1:5000/is_friend', {
      method: "POST",
      body: friendStatusData
    })
    const friendData = await resFriend.json()
    setFriendStatus(friendData.friend_status)

    const feedData = new FormData
    feedData.append("uid", '{"$oid":"'+JSON.parse(data["user_info"])["_id"]["$oid"]+'"}')
    const resFeed = await fetch('http://127.0.0.1:5000/get_user_posts', {
      method: "POST",
      body: feedData
    })
    const userPostData = await resFeed.json()
    setFeed(JSON.parse(userPostData["posts"]))
    setLoading(false)
  }

  const sendFriendReq = async () => {
    const addFriendData = new FormData
    addFriendData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    addFriendData.append("oid", '{"$oid":"'+reqUser["_id"]["$oid"]+'"}')
    const resAddFriend = await fetch('http://127.0.0.1:5000/req_friend', {
      method: "POST",
      body: addFriendData
    })
    const addedFriendData = await resAddFriend.json()
    setFriendStatus(addedFriendData.friend_status)
  }

  const acceptFriend = async () => {
    const decideFriendData = new FormData
    decideFriendData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    decideFriendData.append("oid", '{"$oid":"'+reqUser["_id"]["$oid"]+'"}')
    decideFriendData.append("decision", 'True')
    const resdecideFriend = await fetch('http://127.0.0.1:5000/decide_friend', {
      method: "POST",
      body: decideFriendData
    })
    const decidedFriendData = await resdecideFriend.json()
    setFriendStatus(decidedFriendData.friend_status)
  }

  const rejectFriend = async () => {
    const decideFriendData = new FormData
    decideFriendData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    decideFriendData.append("oid", '{"$oid":"'+reqUser["_id"]["$oid"]+'"}')
    decideFriendData.append("decision", 'False')
    const resdecideFriend = await fetch('http://127.0.0.1:5000/decide_friend', {
      method: "POST",
      body: decideFriendData
    })
    const decidedFriendData = await resdecideFriend.json()
    setFriendStatus(decidedFriendData.friend_status)
  }

  const removeFriend = async () => {
    const removeFriendData = new FormData
    removeFriendData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    removeFriendData.append("oid", '{"$oid":"'+reqUser["_id"]["$oid"]+'"}')
    const resRemoveFriend = await fetch('http://127.0.0.1:5000/remove_friend', {
      method: "POST",
      body: removeFriendData
    })
    const removedFriendData = await resRemoveFriend.json()
    setFriendStatus(removedFriendData.friend_status)
  }

  return user && reqUser ? (
    <Transition
      show={!loading}
      enter="transition-transform	duration-[300ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[300ms]"
      leaveFrom="-translate-x-96"
      leaveTo="-translate-x-0"
    >
      <nav className="w-full h-20 mt-0 bg-white left-0 p-1 top-4 items-left border-b border-stone-700">
        <button className="btn-white mt-8 text-3xl" onClick={() => router.back()}>
          <IoChevronBack />
        </button>
      </nav>
      <div className="w-11/12 md:w-1/2 mx-auto">
        <div className="container mx-auto mt- justify-center">
          <Countdown user={reqUser} />
          <div className='container flex text-left mt-8'>
            <div className='w-16 h-16 mr-4'>
              <img className='w-16 h-16 rounded-full border' src={reqUser.profilePic} />
            </div>
            <div>
              <h1 className="font-bold text-4xl w-full left-0">
                {reqUser.fname} {reqUser.lname}
              </h1>
              <h2 className="text-2xl w-full left-0">
                @{router.query.id}
              </h2>
            </div>
          </div>
        </div>
        <div>
          {friendStatus === 0 ? (
            <div>
              <nav className="container mx-auto mt-4 flex justify-center">
                <ul className="flex justify-end items-center p-1">
                  <li>
                    <button className="btn-yellow mx-2" onClick={removeFriend}>
                      Remove Friend
                    </button>
                  </li>
                </ul>
              </nav>
              <div className='mt-8 pt-4 border-t border-stone-700'>
                <UserGrid feed={feed} loading={loading} />
              </div>
            </div>
          ) : friendStatus === 1 ? (
            <div>
              <nav className="container mx-auto mt-4 flex justify-center">
                <ul className="flex justify-end items-center p-1">
                  <li>
                    <button className="btn-yellow mx-2" disabled={true}>
                      Waiting for {reqUser.fname}
                    </button>
                  </li>
                </ul>
              </nav>
              <div className='mt-8 pt-4 border-t border-stone-700'>
                <UserGrid feed={feed} loading={true} />
              </div>
            </div>
          ) : friendStatus === 2 ? (
            <>
              <h2 className="mt-8 w-full text-center">
                {reqUser.fname} would like to be friends
              </h2>
              <nav className="container mx-auto mt-4 flex justify-center">
                <ul className="flex justify-end items-center p-1">
                  <li>
                    <button className="btn-yellow mx-2" onClick={acceptFriend}>
                      Accept
                    </button>
                  </li>
                </ul>
                <ul className="flex justify-end items-center p-1">
                  <li>
                    <button className="btn-yellow mx-2" onClick={rejectFriend}>
                      Reject
                    </button>
                  </li>
                </ul>
              </nav>
              <div className='mt-8 pt-4 border-t border-stone-700'>
                <UserGrid feed={feed} loading={true} />
              </div>
            </>
          ) : friendStatus === 3 ? (
            <div>
              <nav className="container mx-auto mt-4 flex justify-center">
                <ul className="flex justify-end items-center p-1">
                  <li>
                    <button className="btn-yellow mx-2" onClick={sendFriendReq}>
                      Add As Friend
                    </button>
                  </li>
                </ul>
              </nav>
              <div className='mt-8 pt-4 border-t border-stone-700'>
                <UserGrid feed={feed} loading={true} />
              </div>
            </div>
          ) : (
            <nav className="container mx-auto mt-4 flex justify-center">
              <ul className="flex justify-end items-center p-1">
                <li>
                  <button className="btn-yellow mx-2" disabled={true}>
                    Loading...
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </Transition>
  ) : (
    <>
    </>
  )
}

export default UserPage
