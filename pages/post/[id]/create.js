import React, { useContext, useEffect, useState } from 'react';
import { UserContext, bDayCardContext, bDayCardNextContext, msgContext} from '../../../lib/UserContext';
import { useRouter } from 'next/router'
import { IoChevronBack, IoAdd } from "react-icons/io5";
import { Transition } from '@headlessui/react'
import ImageGrid from '../../../components/images/ImageGrid';
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';


function GiftPage() {
  const [user] = useContext(UserContext)
  const [transition , settransition] = useState(false)
  const [cardUp, setCardUp] = useState(false)
  const [msgUp, setMsgUp] = useState(false)
  const [giftUp, setGiftUp] = useState(false)
  const [bDayCard, setBDayCard] = useState('https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true')
  const [cards, setCards] = useState([])
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const [some, setSome] = useState('')

  useEffect(() => {
    setTimeout(settransition(true), 400)
    setTimeout(function(){
      setCardUp(true)
    }, 500);
    getCards()
  }, [])

  const getCards = async () => {
    const resCards = await fetch('http://127.0.0.1:5000/get_cards', {
      method: "GET",
    })
    const dataCards = await resCards.json()
    setCards(JSON.parse(dataCards["cards"]))
    settransition(true)
  }

  const GiveGift = () => {
    setMsgUp(false)
    setTimeout(function(){
      setGiftUp(true)
    }, 500);
  }

  const submitNoGift = async () => {
    setLoading(true)
    const wish = new FormData
    wish.append("pid", '{"$oid":"'+router.query.id+'"}')
    wish.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    wish.append("url", bDayCard)
    wish.append("message", msg)
    await fetch('http://127.0.0.1:5000/create_wish', {
      method: "POST",
      body: wish
    })
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

  const payForCard = async (token) => {
    const info = new FormData
    info.append("source", token.token)
    info.append("amount", 17)
    await fetch('http://127.0.0.1:5000/pay', {
      method: "POST",
      body: info
    })
  }

  return user && cards ? (
    <Transition
      show={transition}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-96"
      leaveTo="-translate-x-0"
    >
      <bDayCardContext.Provider value={[bDayCard, setBDayCard]}>
        <bDayCardNextContext.Provider value={[cardUp, setCardUp]}>
          <msgContext.Provider value={[msgUp, setMsgUp]}>
            <div className="w-full md:w-1/2 mx-auto">
              <nav className="w-full h-20 item-center mt-0 left-0 p-1 top-4 border-b border-stone-700">
                <div className='w-full flex'>
                  <button className="btn-white left-0 mt-8 text-3xl" disabled={loading} onClick={() => router.back()}>
                    <IoChevronBack />
                  </button>
                </div>
                <div className='w-full font-bold flex justify-center text-2xl -mt-10 pb-4'>
                  <h1>Create A Wish</h1>
                </div>
              </nav>
              <img src={bDayCard} className='mx-auto mt-8 shadow rounded w-4/5 h-48 object-fill'/>
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
              <Transition
              show={msgUp}
              enter="transition-transform	duration-[400ms]"
              enterFrom="-translate-x-96"
              enterTo="-translate-x-0"
              leave="transition-transform	duration-[400ms]"
              leaveFrom="-translate-x-0"
              leaveTo="translate-x-96"
              >
                <div className="w-full p-4 justify-center items-center">
                  <h1 className='flex justify-center mb-4 text-2xl'>2. Write a Message</h1>
                  <label htmlFor="message" className="block text-sm font-bold mb-2">Your message (60 Characters)</label>
                  <textarea 
                  rows="4" 
                  className="block p-2.5 w-full shadow appearance-none border-lg bg-gray-200 rounded leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  onChange={(e) => setMsg(e.target.value)}
                  value={msg}
                  maxLength="60"
                  disabled={loading}
                  >
                  </textarea>
                  <button className='btn-white mt-4 flex text-2xl items-center mx-auto' disabled={loading} onClick={GiveGift}>
                    <IoAdd /> Add a gift?
                  </button>
                  <button className='btn-yellow mt-24 mb-32 text-2xl flex mx-auto' disabled={loading} onClick={submitNoGift}>
                    Make your wish
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
                <div className="w-full p-4 justify-center items-center">
                  <h1 className='flex justify-center mb-4 text-2xl'>3. Add a Gift</h1>
                  <PaymentForm
                    applicationId="sandbox-sq0idb-zo5Ox1DUaC1cc-pMsSluwA"
                    cardTokenizeResponseReceived={async (token) => {
                      payForCard(token)
                    }}
                    locationId='LPTT4PFM4RPJB'
                  >
                    <CreditCard 
                      buttonProps={{
                        css: {
                          backgroundColor: "#FACC15",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                          lineHeight: "2rem",
                          color: "#000",
                          "&:hover": {
                            backgroundColor: "#EAB308",
                          },
                          "&:disabled": {
                            backgroundColor: "#FEF08A",
                          }
                        },
                      }}
                      style={{
                        input: {
                          fontSize: '14px',
                        },
                        'input::placeholder': {
                          color: '#771520',
                        },
                      }}
                    >
                      Make your wish
                    </CreditCard>
                  </PaymentForm>
                  {some}
                </div>
              </Transition>
            </div>
          </msgContext.Provider>
        </bDayCardNextContext.Provider>
      </bDayCardContext.Provider>
    </Transition>
  ) : (
    <>
    </>
  )
}

export default GiftPage
