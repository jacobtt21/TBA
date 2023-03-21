import React, { useState, useEffect } from 'react';
import { Browser } from '@capacitor/browser';

export default function Card({ gift }) {
  const [reqUser, setReqUser] = useState()

  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    const currentUserData = new FormData
    currentUserData.append("cid", '{"$oid":"'+gift["sender"]["$oid"]+'"}')
    const resUser = await fetch('http://127.0.0.1:5000/get_id_info', {
      method: "POST",
      body: currentUserData
    })
    const data = await resUser.json()
    setReqUser(JSON.parse(data["user_info"]))
  }

  const openCard = async () => {
    await Browser.open({ url: gift["url"] });
  };

  return reqUser ? (
    <div className="flow-root bg-gray-200 p-2 rounded-lg flex mb-8" onClick={openCard}>  
      <div className="float-left w-[48%]">
        <img src={gift["image"]} className='mx-auto shadow rounded-lg w-4/5 object-fill'/>
      </div>
      <div className="float-right w-[51%]">
        <h1 className='text-2xl'>Amount: ${gift["amount"]}</h1>
        <h1 className='text-2xl mt-2'>From: @{reqUser["username"]}</h1>
      </div>
    </div>
  ) : (
    <>
    </>
  )
}