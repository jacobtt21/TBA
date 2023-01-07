import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../lib/UserContext';
import FriendList from '../components/friendList/FriendList';

function Pending() {
  const [user] = useContext(UserContext);
  const [pending, setPending] = useState(false)
  
  useEffect(() => {
    getPending()
  }, [])

  const getPending = async () => {
    const notificationData = new FormData
    notificationData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
    const resNotify = await fetch('http://127.0.0.1:5000/notify_friend', {
      method: "POST",
      body: notificationData
    })
    const dataNotify = await resNotify.json();
    setPending(JSON.parse(dataNotify["list"]))
  }

  return user && pending ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="mx-auto justify-center text-center items-center">
        <h3 className="font-bold mt-16 text-2xl">
          Pending Friend Requests
        </h3>
      </div>
      <div className="mt-4 left-0">
      <FriendList list={pending} />
      </div>
    </div>
  ) : (
    <>
    </>
  )
}

export default Pending
