import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../lib/UserContext';
import { useRouter } from 'next/router'
import { IoChevronBack, IoAdd } from "react-icons/io5";
import { Transition } from '@headlessui/react'
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Hits, connectSearchBox } from "react-instantsearch-dom";

function GiftPage() {
  const [user] = useContext(UserContext)
  const [transitionFull, setTransitionFull] = useState(false)
  const [bdayCardCard, setBdayCardCard] = useState(false)
  const [msgCard, setMsgCard] = useState(false)
  const [giftcardCard, setGiftcardCard] = useState(false)
  const [amountCard, setAmountCard] = useState(false)
  const [paymentCard, setPaymentCard] = useState(false)

  const [bdayCard, setBdayCard] = useState('https://github.com/Oustro/OustroImages/blob/main/bday.png?raw=true')
  const [msg, setMsg] = useState('')
  const [giftcard, setGiftcard] = useState([])

  const [loading, setLoading] = useState(false)
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
    await fetch('http://127.0.0.1:5000/create_wish', {
      method: "POST",
      body: wish
    })
    setMsgCard(false)
    setTimeout(function(){
      router.back()
    }, 600);
  }

  const submitWithGift = async (token) => {
    const info = new FormData
    info.append("source", token.token)
    info.append("amount", 17)
    await fetch('http://127.0.0.1:5000/pay', {
      method: "POST",
      body: info
    })
  }

  const selectBdayCard = (e) => {
    setBdayCard(e)
    setBdayCardCard(false)
    setTimeout(function(){
      setMsgCard(true)
    }, 500);
  }

  const addGiftcard = () => {
    setMsgCard(false)
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
    setTimeout(function(){
      setAmountCard(true)
    }, 500);
  }

  const payForGift = () => {
    setAmountCard(false)
    setTimeout(function(){
      setPaymentCard(true)
    }, 500);
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
        <img src={bdayCard} className='mx-auto mt-8 shadow rounded-lg w-4/5 h-48 object-fill'/>
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
            <button className='btn-white mt-4 flex text-2xl items-center mx-auto' disabled={loading} onClick={addGiftcard}>
              <IoAdd /> Add a gift?
            </button>
            <button className='btn-yellow mt-24 w-full p-4 text-2xl items-center mx-auto' disabled={loading} onClick={submitNoGift}>
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
          <div className="w-full p-4 justify-center items-center">
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
                disabled={loading}
              />
            </div>
            <button className='btn-yellow mt-20 w-full p-4 text-2xl items-center mx-auto' disabled={loading} onClick={payForGift}>
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
            <h1 className='flex justify-center mb-4 text-2xl'>3. Checkout</h1>
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
