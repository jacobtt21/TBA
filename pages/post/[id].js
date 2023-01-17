import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../../lib/UserContext';
import { useRouter } from 'next/router'
import WishGrid from '../../components/wishes/WishGrid';
import { IoChevronBack, IoAdd } from "react-icons/io5";
import Link from 'next/link'
import { Transition } from '@headlessui/react'

function UserPage() {
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
      <nav className="w-full h-20 mt-0 bg-white left-0 p-1 top-4 items-left border-b border-stone-700">
        <button className="btn-white mt-8 text-3xl" onClick={() => router.back()}>
          <IoChevronBack />
        </button>
      </nav>
      <div className="w-full mt-28 mb-28 flex justify-center items-center">
        <WishGrid wishes={wishlist} loading={loading} />
      </div>
        <div className="w-full mt-28 mb-28 flex justify-center items-center">
          <Link href="/">
            <button className="btn-yellow flex items-center text-2xl" >
              <IoAdd /> Add a wish
            </button>
          </Link>
        </div>
      </Transition>
  ) : (
    <>
    </>
  )
}

export default UserPage
