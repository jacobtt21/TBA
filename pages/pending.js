import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import FriendList from '../components/friendList/FriendList';

function Pending() {
  const [user] = useContext(UserContext);
  const [pending, setPending] = useState(false)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    getPending()
  }, [])

  const getPending = async () => {
    try {
      const notificationData = new FormData
      notificationData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
      const resNotify = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/notify_friend', {
        method: "POST",
        body: notificationData
      })
      const dataNotify = await resNotify.json();
      if (JSON.parse(dataNotify["list"])) {
        setPending(JSON.parse(dataNotify["list"]))
      }
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  return user && pending ? (
    <div className="w-full">
      <div className="mx-auto justify-center text-center items-center">
        <h3 className="font-bold mt-16 text-2xl">
          Pending Friend Requests
        </h3>
      </div>
      <div className="mt-4 w-full">
        <FriendList list={pending} loading={loading}/>
      </div>
    </div>
  ) : (
    <div className="w-full">
      <div className="mx-auto justify-center text-center items-center">
        <h3 className="font-bold mt-16 text-2xl">
          Pending Friend Requests
        </h3>
      </div>
      <div className="mx-auto justify-center text-center items-center">
        <h3 className="mt-16 text-1xl">
          No Pending Friend Requests
        </h3>
      </div>
    </div>
  )
}

export default Pending
