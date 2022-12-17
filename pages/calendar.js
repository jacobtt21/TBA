import { useContext } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Link from 'next/link'

function calendar() {
  const user = useContext(UserContext);

  return user ? (
    <div className="w-4/5 md:w-1/2 mx-auto">
      <div className="mx-auto justify-center text-center items-center">
        <h3 className="font-bold mt-16 text-4xl">
          We're Glad <span className="bg-yellow-400 rounded-lg p-1">You're</span> Here
        </h3>
        <h3 className="font-bold mt-8 text-2xl">something nice about TBA, Oustro, and then the rules and links to website like that</h3>
      </div>
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end items-center pt-8">
          <Link href="/">
            <button className="btn-yellow text-2xl">
              I accept
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

export default calendar;
