import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../../lib/UserContext';
import { useRouter } from 'next/router'
import { IoChevronBack, IoAdd } from "react-icons/io5";
import { Transition } from '@headlessui/react'

function GiftPage() {
  const [user] = useContext(UserContext)
  const [loading , setLoading] = useState(false)
  const [cardUp, setCardUp] = useState(false)
  const [giftUp, setGiftUp] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setTimeout(setLoading(true), 400)
  }, [])


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
      <nav className="w-full h-20 mt-0 bg-white left-0 p-1 top-4 items-left border-b border-stone-700">
        <button className="btn-white flex items-center mt-8 text-3xl" onClick={() => router.back()}>
          <IoChevronBack /> Cancel
        </button>
      </nav>
      <div className="w-full mt-8 flex justify-center items-center">
        <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={() => setCardUp(true)}>
          Choose a Card
        </button>
      </div>
      <div className="w-full mt-8 p-4 justify-center items-center">
        <label for="message" className="block text-sm font-bold mb-2">Your message</label>
        <textarea rows="4" className="block p-2.5 w-full shadow appearance-none border-lg bg-gray-200 rounded leading-tight focus:outline-none focus:shadow-outline"></textarea>
      </div>
      <div className="w-full mt-8 flex justify-center items-center">
        <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={() => setGiftUp(true)}>
          Add a Gift
        </button>
      </div>
      <Transition
      show={cardUp}
      enter="transition-transform	duration-[400ms]"
      enterFrom="translate-y-96"
      enterTo="-translate-y-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-y-0"
      leaveTo="translate-y-96"
      >
        <div className="w-full mt-8 flex justify-center items-center">
          <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={() => setCardUp(false)}>
            Choose a Card
          </button>
        </div>
      </Transition>
      <Transition
      show={giftUp}
      enter="transition-transform	duration-[400ms]"
      enterFrom="translate-y-96"
      enterTo="-translate-y-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-y-0"
      leaveTo="translate-y-96"
      >
        <div className="w-full mt-8 flex justify-center items-center">
          <button className="btn-yellow flex items-center mt-8 text-1xl" onClick={() => setGiftUp(false)}>
            Choose a Gift
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
