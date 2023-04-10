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
    const resPost = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/get_wishes_by_post', {
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
      <div className="bg-scroll bg-contain fixed overflow-auto h-screen w-full no-scrollbar bg-hero">
        <nav className="w-full h-20 fixed bg-white opacity-90 left-0 top-0 flex justify-center items-center border-b border-stone-700">
          <button className="btn-white absolute mt-8 left-0 text-3xl" onClick={() => router.back()}>
            <IoChevronBack />
          </button>
          <Link href={{pathname: '/post/[id]/create', query: { id: router.query.id }}}>
            <button className="btn-white absolute mt-8 right-0 text-3xl" >
              <IoAdd />
            </button>
          </Link>
        </nav>
        <div className="w-full mb-28 mt-20 flex justify-center items-center">
          <WishGrid wishes={wishlist} loading={loading} />
        </div>
      </div>
    </Transition>
  ) : (
    <>
    </>
  )
}

export default WishPage
