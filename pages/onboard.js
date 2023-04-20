import { useContext } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Link from 'next/link'

function Onboard() {
  const user = useContext(UserContext);
  const userExtra = useContext(UserContextExtra);

  return user && userExtra ? (
    <div className='bg-scroll bg-contain fixed overflow-auto h-full w-full no-scrollbar bg-hero'>
      <div className="container w-11/12 mx-auto mt-16 justify-center">
        <h3 className="font-bold text-center mt-16 text-4xl">
          We're Glad <span className="bg-yellow-400 rounded-lg p-2">You're</span> Here
        </h3>
        <h3 className="mt-8 text-center text-2xl">
          Welcome to The Birthday App, the app that helps you celebrate birthdays with your friends! 
          Use our in-app features to send gifts and wish the very special people in your life a very happy birthday!
        </h3>

        <h3 className="mt-8 font-bold text-center text-2xl">
          Currently we are in beta and are looking for feedback, so please let us know by reaching out with suggestions!
        </h3>
      </div>
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center pt-8">
          <Link href="/">
            <button className="btn-yellow text-2xl">
              Let's go!
            </button>
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <>
    </>
  )
}

export default Onboard;
