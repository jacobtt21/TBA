import React, { useContext, useState, useEffect } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import { magic } from '../lib/magic';
import Link from 'next/link';
import { IoChevronForward, IoCameraReverseOutline} from "react-icons/io5";
import Loading from './loading';
import { Camera, CameraResultType } from '@capacitor/camera';
import algoliasearch from 'algoliasearch';


function Profile() {
  const [user, setUser] = useContext(UserContext);
  const [, setUserExtra] = useContext(UserContextExtra);
  const [reqUser, setReqUser] = useState()
  const [profilePic, setProfilePic] = useState('')
  const [friendNotification, setFriendNotification] = useState(false)
  const [errorOccured, setErrorOccured] = useState(false)
  const [loadChange, SetLoadChange] = useState(false)

  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY,
  );

  const index = searchClient.initIndex('TBA');
  
  useEffect(() => {
    getUserInfo()
  }, [])

  const getUserInfo = async () => {
    try {
      const currentUserData = new FormData
      currentUserData.append("uname", user.username)
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/get_username_info', {
        method: "POST",
        body: currentUserData
      })
      const data = await res.json();
      setReqUser(JSON.parse(data["user_info"]))
      setProfilePic(JSON.parse(data["user_info"])["profilePic"])

      console.log(reqUser)

      const notificationData = new FormData
      notificationData.append("cid", '{"$oid":"'+user.profile.userID+'"}')
      const resNotify = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/notify_friend', {
        method: "POST",
        body: notificationData
      })
      const dataNotify = await resNotify.json();
      setFriendNotification(dataNotify["friend_waiting"])
    } catch (e) {
      setReqUser(false)
      setInterval(setErrorOccured(true), 5000);
    }
  }

  const changeProfilePic = async () => {
    SetLoadChange(true)
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl
      });
      const picData = new FormData
      picData.append('uname', user.username)
      picData.append("pic", image["dataUrl"])
      const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/profile_pic', {
        method: "POST",
        body: picData
      })
      const data = await res.json();
      await index.partialUpdateObject({
        profilePic: data["profilePic"],
        objectID: user.username
      })
      setProfilePic(data["profilePic"])
      SetLoadChange(false)
    } catch (e) {
      SetLoadChange(false)
    }
  }

  async function logOut() {
    try {
      Router.push('/loading');
      if (magic.user.isLoggedIn()) {
        await magic.user.logout()
        setUserExtra()
      }
      await userbase.signOut()
      setUser()
      Router.push('/');
    } catch (e) {
      console.error(e.message)
    }
  }

  return user && reqUser ? (
    <div className='bg-scroll bg-contain fixed overflow-auto h-screen w-full no-scrollbar bg-hero'>
      <div className="container w-11/12 mx-auto mt-16 justify-center">
        <h1 className="font-bold text-4xl mt-4 w-full left-0">
          {user.profile.fname} {user.profile.lname}
        </h1>
        <h2 className="text-3xl w-full left-0">
          @{user.username}
        </h2>
        <div className='relative w-44 h-44 mt-4 mx-auto'>
          <img className={loadChange ? 'w-44 h-44 border rounded-full animate-pulse' : 'w-44 h-44 border rounded-full'} src={profilePic} onClick={changeProfilePic} />
          <span className='absolute px-2 py-2 -mt-12 ml-2 bg-yellow-400 rounded-full text-4xl' onClick={changeProfilePic}><IoCameraReverseOutline /></span>
        </div>
        {friendNotification && (
          <nav className="container mx-auto flex justify-center">
            <ul className="flex justify-end items-center p-1">
              <li>
                <Link href="/pending">
                  <button className="btn-yellow flex items-center mt-8">
                    Pending Friend Requests <IoChevronForward />
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        )}
        <div className="bg-gray-100 p-4 mt-4 left-0 rounded-lg">
          <h2 className="text-2xl w-full left-0">
            Personal Information
          </h2>
          <h2 className="w-full mt-2 left-0">
            Birthday:
          </h2>
          <h2 className="w-full ml-4 left-0">
            {reqUser.month}/{reqUser.day}/{reqUser.year}
          </h2>
          <h2 className="w-full mt-2 left-0">
            Phone Number:
          </h2>
          <h2 className="w-full ml-4 left-0">
            (+1) {user.profile.phoneNumber}
          </h2>
          <h2 className="w-full mt-2 left-0">
            User ID:
          </h2>
          <h2 className="w-full ml-4 left-0">
            {user.profile.userID}
          </h2>
          <h2 className="w-full mt-2 left-0">
            Member Since:
          </h2>
          <h2 className="w-full ml-4 left-0">
            {user.creationDate}
          </h2>
        </div>
        <div className="bg-gray-100 p-4 mt-4 left-0 rounded-lg">
          <h2 className="text-2xl w-full left-0">
            Account Information
          </h2>
          <h2 className="w-full mt-2 left-0">
            Legal
          </h2>
          <h2 className="w-full ml-4 mt-2 left-0">
            Terms of Service
          </h2>
          <h2 className="w-full ml-4 left-0">
            Privacy Policy
          </h2>
          <h2 className="w-full mt-2 left-0">
            Support
          </h2>
          <h2 className="w-full ml-4 mt-2 left-0">
            The Birthday App Support
          </h2>
          <h2 className="w-full ml-4 left-0">
            Oustro Support
          </h2>
          <h2 className="w-full ml-4 mt-2 left-0">
            Helpful Documents
          </h2>
          <h2 className="w-full mt-2 left-0">
            Rate The Birthday App
          </h2>
          <h2 className="w-full mt-2 left-0">
            Send Feedback
          </h2>
        </div>
        <nav className="container mx-auto mt-8 mb-32 flex justify-center">
          <ul className="flex justify-end items-center p-1">
            <li>
              <button className="btn-white text-2xl mx-2" onClick={logOut}>
                Log Out
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  ) : (
    <>
      {errorOccured ? (
        <div className="w-full">
          <div className="mx-auto justify-center text-center items-center">
            <h3 className="font-bold mt-16 text-2xl">
              Server Connection Error
            </h3>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Profile
