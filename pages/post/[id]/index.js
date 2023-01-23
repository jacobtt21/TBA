import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../../lib/UserContext';
import { useRouter } from 'next/router'
import WishGrid from '../../../components/wishes/WishGrid';
import { IoChevronBack, IoAdd } from "react-icons/io5";
import Link from 'next/link'
import { Transition } from '@headlessui/react'

function WishPage() {
  const [user] = useContext(UserContext)
  const [wishlist, setWishList] = useState()
  const [loading , setLoading] = useState(true)
  const router = useRouter();

  useEffect(() => {
    getPostInfo()
  }, [])

  const getPostInfo = async () => {
    setLoading(true)
    const postData = new FormData
    postData.append("pid", '{"$oid":"'+router.query.id+'"}')
    const resPost = await fetch('http://127.0.0.1:5000/get_wishes_by_post', {
      method: "POST",
      body: postData
    })
    const data = await resPost.json()
    setWishList(JSON.parse(data["wishes"]))
    setLoading(false)
  }

  return user && wishlist ? (
    <Transition
      show={!loading}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-96"
      leaveTo="-translate-x-0"
    >
      <nav className="w-full h-20 mt-0 bg-white flex p-1 top-4 items-left border-b border-stone-700">
        <button className="btn-white absolute mt-8 left-0 text-3xl" onClick={() => router.back()}>
          <IoChevronBack />
        </button>
        <Link href={{pathname: '/post/[id]/create', query: { id: router.query.id }}}>
          <button className="btn-white absolute mt-8 right-0 text-3xl" >
            <IoAdd />
          </button>
        </Link>
      </nav>
      <div className="w-full mb-28 flex justify-center items-center">
        <WishGrid wishes={wishlist} loading={loading} />
      </div>
      {/* <div className="w-full mt-28 mb-28 flex justify-center items-center">
        <Link href={{pathname: '/post/[id]/create', query: { id: router.query.id }}}>
          <button className="btn-yellow flex items-center text-2xl" >
            <IoAdd /> Make a wish
          </button>
        </Link>
      </div> */}
    </Transition>
  ) : (
    <>
    </>
  )
}

export default WishPage
