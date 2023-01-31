import React, { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react'

export default function WishCard({ PostID }) {
  const [reqUser, setReqUser] = useState()
  const [front, setFront] = useState(true)
  const [back, setBack] = useState(false)

  useEffect(() => {
    getWishInfo()
  }, [])

  const getWishInfo = async () => {
    const currentUserData = new FormData
    currentUserData.append("cid", '{"$oid":"'+PostID["sender"]["$oid"]+'"}')
    const resUser = await fetch('http://127.0.0.1:5000/get_id_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))
  }

  const showBack = () => {
    setFront(false)
    setTimeout(function(){
      setBack(true)
    }, 500);
  }

  const showFront = () => {
    setBack(false)
    setTimeout(function(){
      setFront(true)
    }, 500);
  }

  return reqUser ? (
    <div className='w-full md:w-1/2 mx-auto'>
      <div className='container mt-4 flow-root items-center py-2 px-4 rounded-lg'>
        <div className='container flex text-left items-center'>
          <div className='w-12 h-12'>
            <img className='w-12 h-12 rounded-full border' src={reqUser.profilePic} />
          </div>
          <div>
            <h2 className="text-2xl ml-2 w-full left-0">
              @{reqUser.username}
            </h2>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-0 rounded w-4/5 h-48 object-fill'>
        <h1 className='text-center p-12'>
          &nbsp;
        </h1>
      </div>
      {PostID.message ? (
        <>
          <Transition
          show={front}
          enter="transition-transform	duration-[400ms]"
          enterFrom="-translate-x-96"
          enterTo="-translate-x-0"
          leave="transition-transform	duration-[400ms]"
          leaveFrom="-translate-x-0"
          leaveTo="translate-x-96"
          >
            <img src={PostID.card} onClick={showBack} className='mx-auto -mt-48 shadow-2xl rounded w-4/5 h-48 object-fill'/>
          </Transition>
          <Transition
          show={back}
          enter="transition-transform	duration-[400ms]"
          enterFrom="-translate-x-96"
          enterTo="-translate-x-0"
          leave="transition-transform	duration-[400ms]"
          leaveFrom="-translate-x-0"
          leaveTo="translate-x-96"
          >
            <div onClick={showFront} className='mx-auto bg-gray-100 -mt-48 shadow-2xl rounded w-4/5 h-48 object-fill'>
              <h1 className='text-center p-16'>
                {PostID.message}
              </h1>
            </div>
          </Transition>
        </>
      ) : (
        <>
          <img src={PostID.card} onClick={showBack} className='mx-auto -mt-48 shadow rounded w-4/5 h-48 object-fill'/>
        </>
      )}
    </div>
  ) : (
    <>
    </>
  )
}