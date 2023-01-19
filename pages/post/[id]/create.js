import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../../lib/UserContext';
import { useRouter } from 'next/router'
import { IoChevronBack } from "react-icons/io5";
import { Transition } from '@headlessui/react'
import ImageGrid from '../../../components/images/ImageGrid';

function GiftPage() {
  const [user] = useContext(UserContext)
  const [loading , setLoading] = useState(false)
  const [cardUp, setCardUp] = useState(false)
  const [msgUp, setMsgUp] = useState(false)
  const [giftUp, setGiftUp] = useState(false)
  const [bDayCard, setBDayCard] = useState('https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true')
  const [cards, setCards] = useState(['https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true', 'https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true'])
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
      <div className="w-full md:w-1/2 mx-auto">
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
        <img src='https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true' className='mx-auto mt-8 rounded w-4/5 h-48 object-fill'/>
        <Transition
        show={cardUp}
        enter="transition-transform	duration-[400ms]"
        enterFrom="-translate-x-96"
        enterTo="-translate-x-0"
        leave="transition-transform	duration-[400ms]"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-96"
        >
          <div className="w-full mt-4 mb-32 justify-center items-center">
            <h1 className='flex justify-center text-2xl'>1. Choose a Card</h1>
            <ImageGrid cards={cards} />
          </div>
        </Transition>
      </div>
    </Transition>
  ) : (
    <>
    </>
  )
}

export default GiftPage
