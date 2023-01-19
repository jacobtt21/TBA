import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../../lib/UserContext';
import { useRouter } from 'next/router'
import { IoChevronBack } from "react-icons/io5";
import { Transition } from '@headlessui/react'

function GiftPage() {
  const [user] = useContext(UserContext)
  const [loading , setLoading] = useState(false)
  const [cardUp, setCardUp] = useState(false)
  const [msgUp, setMsgUp] = useState(false)
  const [giftUp, setGiftUp] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setTimeout(setLoading(true), 400)
    setTimeout(function(){
      setCardUp(true)
    }, 500);
  }, [])

  const WriteMessage = () => {
    setCardUp(false)
    setTimeout(function(){
      setMsgUp(true)
    }, 500);
  }

  const GiveGift = () => {
    setMsgUp(false)
    setTimeout(function(){
      setGiftUp(true)
    }, 500);
  }

  const submitNoGift = async () => {
    setMsgUp(false)
    setTimeout(function(){
      router.back()
    }, 600);
  }

  const submitGift = async () => {
    setGiftUp(false)
    setTimeout(function(){
      router.back()
    }, 600);
  }


  return user ? (
    <Transition
      show={loading}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-96"
      leaveTo="-translate-x-0"
    >
      <nav className="w-full h-20 item-center mt-0 left-0 p-1 top-4 border-b border-stone-700">
        <div className='w-1/5'>
          <button className="btn-white mt-8 text-3xl" onClick={() => router.back()}>
            <IoChevronBack />
          </button>
        </div>
        <div className='w-full font-bold flex justify-center text-2xl -mt-10 pb-4'>
          <h1>Create A Wish</h1>
        </div>
      </nav>
      <img src='https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true' className='mx-auto mt-8 rounded w-4/5 h-48 object-cover'/>
      <Transition
      show={cardUp}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className="w-11/12 h-48 rounded mx-auto bg-red-400 mt-8">
          <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={WriteMessage}>
            Next: Write a Message
          </button>
        </div>
      </Transition>
      <Transition
      show={msgUp}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className="w-4/5 h-48 rounded mx-auto bg-red-400 mt-8">
          <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={submitNoGift}>
            Make Your Wish
          </button>
          <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={GiveGift}>
            Add a Gift
          </button>
        </div>
      </Transition>
      <Transition
      show={giftUp}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className="w-4/5 h-48 rounded mx-auto bg-red-400 mt-8">
          <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={submitGift}>
            Make Your Wish
          </button>
        </div>
      </Transition>
    </Transition>
  ) : (
    <>
    </>
  )
}

export default GiftPage
