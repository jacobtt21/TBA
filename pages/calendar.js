import { useContext } from 'react';
import { UserContext } from '../lib/UserContext';

function Calendar() {
  const user = useContext(UserContext);

  return user ? (
    <div className="w-11/12 md:w-1/2 mx-auto">
      <div className="mx-auto justify-center text-center items-center">
        <h3 className="font-bold mt-16 text-4xl">
          Calendar
        </h3>
        <div className="relative mt-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
          className="shadow appearance-none border-lg bg-gray-200 rounded w-full py-2 pl-10 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Search Friend's Usernames"
        />
        </div>
      </div>
    </div>
  ) : (
    <>
    </>
  )
}

export default Calendar;
