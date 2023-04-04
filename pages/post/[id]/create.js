import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../lib/UserContext';
import { useRouter } from 'next/router'
import { IoChevronBack, IoAdd, IoChevronForward } from "react-icons/io5";
import { Transition } from '@headlessui/react'
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";
import { numberFormat } from '../../../lib/convert';

function GiftPage() {
  const [user] = useContext(UserContext)
  const [phase, setPhase] = useState(1)
  const [transitionFull, setTransitionFull] = useState(false)
  const [bdayCardCard, setBdayCardCard] = useState(false)
  const [msgCard, setMsgCard] = useState(false)
  const [giftcardCard, setGiftcardCard] = useState(false)
  const [amountCard, setAmountCard] = useState(false)
  const [paymentCard, setPaymentCard] = useState(false)
  const [confirmationCard, setConfirmationCard] = useState(false)

  const [bdayCard, setBdayCard] = useState('')
  const [msg, setMsg] = useState('')
  const [giftcard, setGiftcard] = useState([])
  const [amount, setAmount] = useState(10)
  const [privateMsg, setPrivateMsg] = useState('True')

  const [loading, setLoading] = useState(false)
  const [genImageLoading, setGenImageLoading] = useState(false)
  const router = useRouter();

  useEffect(() => {
    setTimeout(setTransitionFull(true), 400)
    setTimeout(function(){
      setBdayCardCard(true)
    }, 500);
  }, [])

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY,
  );

  const HitBdayCard = ({ hit }) => {
    return (
      <div className='container shadow mt-4 mx-auto flow-root w-4/5 items-center rounded-lg' onClick={() => selectBdayCard(hit.cardPic)}>
        <img src={hit.cardPic} className="rounded-lg object-fill w-full"/>
      </div>
    );
  }

  const SearchBoxBdayCard = ({ currentRefinement, refine }) => (
    <>
      <form  
      noValidate 
      action="" 
      role="search"
      >
        <div className="relative p-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
          className="shadow appearance-none border-lg bg-gray-200 rounded w-full py-2 pl-10 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="A card with a cupcake"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)} 
          />
        </div>
      </form>
      <div className="flex relative overflow-x-scroll no-scrollbar pb-4">
        <div className="pl-4">
          <button className='btn-yellow' onClick={() => refine("Colorful")}>
            Colorful
          </button>
        </div>
        <div className="pl-2">
          <button className='btn-yellow' onClick={() => refine("Retro")}>
            Retro
          </button>
        </div>
        <div className="pl-2">
          <button className='btn-yellow' onClick={() => refine("Sports")}>
            Sports
          </button>
        </div>
        <div className="pl-2">
          <button className='btn-yellow' onClick={() => refine("Fun")}>
            Fun
          </button>
        </div>
        <div className="pl-2">
          <button className='btn-yellow' onClick={() => refine("Art")}>
            Artsy
          </button>
        </div>
        <div className="pl-2 pr-4">
          <button className='btn-yellow' onClick={() => refine("Classic")}>
            Classic
          </button>
        </div>
      </div>
      <Hits hitComponent={HitBdayCard} />
    </>
  );  

  const CustomSearchBoxBdayCard = connectSearchBox(SearchBoxBdayCard);

  const HitGiftcard = ({ hit }) => {
    return (
      <div className='container shadow mt-4 mx-auto flow-root w-4/5 items-center rounded-lg' onClick={() => chooseAmount(hit.id, hit.cardPic)}>
        <img src={hit.cardPic} className="rounded-lg object-fill w-full"/>
      </div>
    );
  }

  const SearchBoxGiftcard = ({ currentRefinement, refine }) => (
    <>
      <form  
      noValidate 
      action="" 
      role="search"
      >
        <div className="relative p-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
          className="shadow appearance-none border-lg bg-gray-200 rounded w-full py-2 pl-10 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Search for a brand"
          value={currentRefinement}
          onChange={event => refine(event.currentTarget.value)} 
          />
        </div>
      </form>
      <Hits hitComponent={HitGiftcard} />
    </>
  );  

  const CustomSearchBoxGiftcard = connectSearchBox(SearchBoxGiftcard);

  const submitNoGift = async () => {
    setLoading(true)
    const wish = new FormData
    wish.append("pid", '{"$oid":"'+router.query.id+'"}')
    wish.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    wish.append("url", bdayCard)
    wish.append("message", msg)
    wish.append('privateMsg', privateMsg)
    wish.append("pay", 'False')
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/create_wish', {
      method: "POST",
      body: wish
    })
    setMsgCard(false)
    setTimeout(function(){
      router.back()
    }, 600);
  }

  const submitWithGift = async (token) => {
    setLoading(true)
    setPaymentCard(false)
    setTimeout(function(){
      setConfirmationCard(true)
    }, 600);
    const info = new FormData
    info.append("source", token.token)
    info.append("amount", parseInt(amount))
    info.append("cardID", giftcard[0])
    const linkData = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/pay', {
      method: "POST",
      body: info
    })
    const link = await linkData.json()

    const wish = new FormData
    wish.append("pid", '{"$oid":"'+router.query.id+'"}')
    wish.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    wish.append("url", bdayCard)
    wish.append("message", msg)
    wish.append('privateMsg', privateMsg)
    wish.append("pay", 'True')
    const wishData =  await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/create_wish', {
      method: "POST",
      body: wish
    })
    const dataWish = await wishData.json()

    const postData = new FormData
    postData.append("pid", '{"$oid":"'+router.query.id+'"}')
    const postDataSent = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/get_post_recipient', {
      method: "POST",
      body: postData
    })
    const postDataRes = await postDataSent.json()
    
    const gift = new FormData
    gift.append("wid", dataWish["wish_id"])
    gift.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    gift.append("oid", '{"$oid":"'+JSON.parse(postDataRes["post_info"])["recipient"]["$oid"]+'"}')
    gift.append("url", link["Link"])
    gift.append("amount", amount)
    gift.append("image", giftcard[1])
    await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/create_gift', {
      method: "POST",
      body: gift
    })
    setConfirmationCard(false)
    setTimeout(function(){
      router.back()
    }, 600);
  }

  const nextPhase = () => {
    if (phase === 1) {
      setBdayCardCard(false)
      setPhase(2)
      setTimeout(function(){
        setMsgCard(true)
      }, 500);
    }
  }


  const backPhase = () => {
    if (phase === 1) {
      router.back()
    }
    else if (phase === 2) {
      setMsgCard(false)
      setPhase(1)
      setTimeout(function(){
        setBdayCardCard(true)
      }, 500);
    }
    else if (phase === 3) {
      setGiftcardCard(false)
      setPhase(2)
      setTimeout(function(){
        setMsgCard(true)
      }, 500);
    }
    else if (phase === 4) {
      setAmountCard(false)
      setPhase(3)
      setTimeout(function(){
        setGiftcardCard(true)
      }, 500);
    }
    else if (phase === 5) {
      setPaymentCard(false)
      setPhase(4)
      setTimeout(function(){
        setAmountCard(true)
      }, 500);
    }
  }

  const doNothing = () => {
    console.log("hi, this didn't do anything but we're glad you pressed it!")
  }

  const selectBdayCard = (e) => {
    setBdayCard(e)
  }

  const addGiftcard = () => {
    setMsgCard(false)
    setPhase(3)
    setTimeout(function(){
      setGiftcardCard(true)
    }, 500);
  }

  const chooseAmount = (e, c) => {
    let giftcard = []
    giftcard.push(e)
    giftcard.push(c)
    setGiftcard(giftcard)
    setGiftcardCard(false)
    setPhase(4)
    setTimeout(function(){
      setAmountCard(true)
    }, 500);
  }

  const payForGift = () => {
    setAmountCard(false)
    setPhase(5)
    setTimeout(function(){
      setPaymentCard(true)
    }, 500);
  }

  const genImage = async () => {
    setGenImageLoading(true)
    const newCard = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/generate_card', {
      method: "GET"
    })
    const newCardRes = await newCard.json()
    setBdayCard(newCardRes["card"])
    setGenImageLoading(false)
  }

  return user ? (
    <Transition
      show={transitionFull}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-96"
      leaveTo="-translate-x-0"
    >
      <div className="w-full h-full md:w-1/2 mx-auto">
        <nav className="w-full h-20 bg-white left-0 top-0 flex justify-center items-center border-b border-stone-700">
          <button className="btn-white absolute mt-8 left-0 text-3xl" onClick={backPhase}>
            <IoChevronBack />
          </button>
          {phase === 1 && (
            <button className="btn-white absolute mt-8 right-0 text-3xl" disabled={bdayCard ? false : true} onClick={nextPhase}>
              <IoChevronForward />
            </button>
          )}
        </nav>
        <div className='w-full font-bold flex justify-center text-2xl -mt-10 pb-4'>
          <h1>Create A Wish</h1>
        </div>
        <div className='w-full sticky bg-white pb-4 pt-2 top-0 z-20 left-0 top-0 flex justify-center items-center' onClick={phase === 1 ? genImage : doNothing}>
          {bdayCard && !genImageLoading ? (
            <img src={bdayCard} className='mx-auto mt-8 sticky shadow rounded-lg w-4/5 h-48 object-fill'/>
          ) : genImageLoading ? (
            <>
              {bdayCard ? (
                <img src={bdayCard} className='mx-auto animate-pulse mt-8 sticky shadow rounded-lg w-4/5 h-48 object-fill'/>
              ) : (
                <div className='mx-auto mt-8 animate-pulse shadow bg-gray-100 rounded-lg w-4/5 h-48 object-fill'>
                  <h1 className='text-center p-16'>
                    Loading...
                  </h1>
                </div>
              )}
            </>
          ) : (
            <div className='mx-auto mt-8 shadow bg-gray-100 rounded-lg w-4/5 h-48 object-fill'>
              <h1 className='text-center p-16'>
                Tap me to use AI to generate a unique birthday card
              </h1>
            </div>
          )}
        </div>
        <Transition
        show={bdayCardCard}
        enter="transition-transform	duration-[400ms]"
        enterFrom="-translate-x-96"
        enterTo="-translate-x-0"
        leave="transition-transform	duration-[400ms]"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-96"
        >
          <div className="w-full mt-4 mb-32 justify-center items-center">
            <h1 className='flex justify-center text-2xl'>1. Choose a card</h1>
            <InstantSearch 
            searchClient={searchClient} 
            indexName="TBABirthdayCards">
              <CustomSearchBoxBdayCard />
            </InstantSearch>
          </div>
        </Transition>
        <Transition
        show={msgCard}
        enter="transition-transform	duration-[400ms]"
        enterFrom="-translate-x-96"
        enterTo="-translate-x-0"
        leave="transition-transform	duration-[400ms]"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-96"
        >
          <div className="w-full p-4 justify-center items-center">
            <h1 className='flex justify-center mb-4 text-2xl'>2. Write a message</h1>
            <label htmlFor="message" className="block text-sm font-bold mb-2">Your message (260 Characters)</label>
            <textarea 
            rows="4" 
            className="block p-2.5 w-full shadow appearance-none border-lg bg-gray-200 rounded leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            maxLength="260"
            disabled={loading}
            >
            </textarea>
            <div className='flex'>
              {privateMsg === 'True' ? (
                <button className='btn-yellow mt-4 w-full items-center mx-auto' disabled={loading} onClick={() => setPrivateMsg(o => 'False')}>
                  <h1>Make Message Public</h1>
                  <p className='font-normal text-sm'>Currently only recipient can see</p>
                </button>
              ) : (
                <button className='btn-yellow mt-4 w-full items-center mx-auto' disabled={loading} onClick={() => setPrivateMsg(o => 'True')}>
                  <h1>Make Message Private</h1>
                  <p className='font-normal text-sm'>Currently friends can see</p>
                </button>
              )}
            </div>
            <button className='btn-white mt-4 flex text-2xl items-center mx-auto' disabled={loading} onClick={addGiftcard}>
              <IoAdd /> Add a gift?
            </button>
            <button className='btn-yellow mt-16 w-full p-4 text-2xl relative items-center mx-auto' disabled={loading} onClick={submitNoGift}>
              Make your wish
            </button>
          </div>
        </Transition>
        <Transition
        show={giftcardCard}
        enter="transition-transform	duration-[400ms]"
        enterFrom="-translate-x-96"
        enterTo="-translate-x-0"
        leave="transition-transform	duration-[400ms]"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-96"
        >
          <div className="w-full mt-4 mb-32 justify-center items-center">
            <h1 className='flex justify-center text-2xl'>3. Choose a giftcard</h1>
            <InstantSearch 
            searchClient={searchClient} 
            indexName="TBAGiftCards">
              <CustomSearchBoxGiftcard />
            </InstantSearch>
          </div>
        </Transition>
        <Transition
        show={amountCard}
        enter="transition-transform	duration-[400ms]"
        enterFrom="-translate-x-96"
        enterTo="-translate-x-0"
        leave="transition-transform	duration-[400ms]"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-96"
        >
          <div className="w-full h-full p-4 justify-center items-center">
            <h1 className='flex justify-center text-2xl'>4. Set an amount</h1>
            <img src={giftcard[1]} className='mx-auto mt-8 shadow rounded-lg w-3/5 object-fill'/>
            <div className='text-center'>
              <label
                className="block text-sm font-bold mb-2 mt-4"
                htmlFor="month"
              >
                Enter Amount for the card (USD)
              </label>
              <input
                className="mx-auto shadow appearance-none border rounded w-20 py-2 px-3 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                id="month"
                type="number"
                pattern="[0-9]*" 
                onChange={(e) => setAmount(e.target.value)}
                value={amount}
                disabled={loading}
              />
            </div>
            <button className='btn-yellow mt-12 mb-0 w-full p-4 text-2xl items-center mx-auto' disabled={loading} onClick={payForGift}>
              Checkout
            </button> 
          </div>
        </Transition>
        <Transition
        show={paymentCard}
        enter="transition-transform	duration-[400ms]"
        enterFrom="-translate-x-96"
        enterTo="-translate-x-0"
        leave="transition-transform	duration-[400ms]"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-96"
        >
          <div className="w-full p-4 justify-center items-center">
            <h1 className='flex justify-center mb-4 text-2xl'>5. Checkout</h1>
            <div className="flow-root bg-gray-200 p-4 rounded-lg flex mb-8">  
              <div className="float-left w-[48%]">
                <img src={giftcard[1]} className='mx-auto shadow rounded-lg w-4/5 object-fill'/>
              </div>
              <div className="float-right w-[48%]">
                <h1 className='text-1xl'>${amount} (giftcard)</h1>
                <h1 className='text-1xl line-through'>{numberFormat((amount * 0.029) + 1)} (service fee)</h1>
                <h1 className='text-2xl'>${amount}</h1>
              </div>
            </div>

            <PaymentForm
              applicationId="sandbox-sq0idb-zo5Ox1DUaC1cc-pMsSluwA"
              cardTokenizeResponseReceived={async (token) => {
                submitWithGift(token)
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
                      backgroundColor: "#eab308",
                    },
                    "&:disabled": {
                      backgroundColor: "#eab308",
                    }
                  },
                }}
                style={{
                  input: {
                    fontSize: '14px',
                  },
                  'input::placeholder': {
                  },
                }}
              >
                Make your wish
              </CreditCard>
            </PaymentForm>
          </div>
        </Transition>
        <Transition
        show={confirmationCard}
        enter="transition-transform	duration-[400ms]"
        enterFrom="-translate-x-96"
        enterTo="-translate-x-0"
        leave="transition-transform	duration-[400ms]"
        leaveFrom="-translate-x-0"
        leaveTo="translate-x-96"
        >
          <div className="w-full h-full p-4 justify-center items-center">
            <h1 className='flex mt-16 text-center justify-center text-2xl'>
              Boom, you've just made someone's day and we'll take care of the rest!
            </h1>
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
