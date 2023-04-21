import { useState, useContext } from 'react';
import { UserContext, UserContextExtra } from '../lib/UserContext';
import Router from 'next/router';
import userbase from 'userbase-js'
import Link from 'next/link'
import { magic } from '../lib/magic';
import algoliasearch from 'algoliasearch';
import { Transition } from '@headlessui/react';
import { IoEyeOff, IoEyeOutline } from "react-icons/io5";

function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fname, setFName] = useState('')
  const [lname, setLName] = useState('')
  const [month, setMonth] = useState('')
  const [day, setDay] = useState('')
  const [year, setYear] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState()
  const [error, setError] = useState()
  const [, setUser] = useContext(UserContext);
  const [, setUserExtra] = useContext(UserContextExtra);


  const [nameCard, setNameCard] = useState(true)
  const [bdayCard, setBdayCard] = useState(false)
  const [usernameCard, setUsernameCard] = useState(false)
  const [phoneNumberCard, setPhoneNumberCard] = useState(false)
  const [passwordCard, setPasswordCard] = useState(false)
  const [reviewCard, setReviewCard] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const getBday = () => {
    if (fname === '' || lname === '') {
      setError('Missing Required Fields')
      return
    }
    let first = fname.slice(0, 1).toUpperCase() + fname.slice(1).toLowerCase()
    let last = lname.slice(0, 1).toUpperCase() + lname.slice(1).toLowerCase()
    setFName(first)
    setLName(last)
    setNameCard(false)
    setError()
    setTimeout(function(){
      setBdayCard(true)
    }, 500);
  }

  const getUname = () => {
    // checking whether or not the fields are there
    if (month === '' || day === '' || year === '') {
      setError('Missing Required Fields')
      return
    }

    const currDate = new Date();
    let currYear = currDate.getFullYear();

    // checking lengths of the inputs
    if (month.length !== 2 || day.length !== 2 || year.length !== 4) {
      setError('Please input a month like 12, day like 06, and year like 2001')
      return
    }

    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // making sure no negative numbers or 0
    if (parseInt(day) <= 0 || parseInt(month) <= 0 || parseInt(year) <= 0) {
      setError('Days, Months, and Years cannot be less than 0')
      return
    }
    // making sure not past 12 months
    if (parseInt(month) > 12) {
      setError('Months cannot be greater that 12')
      return
    }

    // if the leap year and feb, check whether it is less than 29
    if (parseInt(month) === 2 && parseInt(year) % 4 === 0) {
      if (29 < parseInt(day)) {
        setError("Even though it's a leap year, that day doesn't exist")
        return
      }
    } 
    // if not a leap year and not feb, making sure day is within month
    else {
      if (ListofDays[parseInt(month) - 1] < parseInt(day)) {
        setError("That day doesn't exist")
        return
      }
    }

    // making sure greater than 13
    if (parseInt(year) > parseInt(currYear) - 13) {
      setError('You seem to be too young to use The Birthday App')
      return
    }
    else if (parseInt(year) === parseInt(currYear) - 13) {
      if (parseInt(month) > parseInt(currDate.getMonth()) + 1) {
        setError('You seem to be too young to use The Birthday App')
        return
      }
      else if (parseInt(month) === parseInt(currDate.getMonth()) + 1) {
        console.log(parseInt(currDate.getDate()))
        if (parseInt(day) > parseInt(currDate.getDate())) {
          setError('You seem to be too young to use The Birthday App')
          return
        }
      }
    } 

    setBdayCard(false)
    setError()
    setTimeout(function(){
      setUsernameCard(true)
    }, 500);
  }

  const getPhoneNumber = () => {
    if (username === '') {
      setError('Missing Required Fields')
      return
    }
    let u = username
    setUsername(u.toLowerCase())
    setError()
    setUsernameCard(false)
    setTimeout(function(){
      setPhoneNumberCard(true)
    }, 500);
  }

  const getPassword = () => {
    if (phoneNumber === '') {
      setError('Missing Required Fields')
      return
    }
    if (phoneNumber.length !== 10) {
      setError('Invalid Phone Number')
      return
    }
    setError()
    setPhoneNumberCard(false)
    setTimeout(function(){
      setPasswordCard(true)
    }, 500);
  }

  const goReview = () => {
    if (password === '') {
      setError('Missing Required Fields')
      return
    }
    setError()
    setPasswordCard(false)
    setTimeout(function(){
      setReviewCard(true)
    }, 500);
  }


  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ADMIN_KEY,
  );

  const index = searchClient.initIndex('TBA');

  async function handleSignUp(e) {
    e.preventDefault()
    setLoading(true)
    try {
      await validateForm();

      const DID = await magic.auth.loginWithSMS({
        phoneNumber: '+1'+phoneNumber,
      });
      const res = await fetch('/api/login', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + DID,
        },
      });
      if (res.status === 200) {
        const userFromMagic = await magic.user.getMetadata()
        const user = await userbase.signUp({
          username,
          password,
          profile: { 'fname': fname, 'lname': lname, 'phoneNumber': phoneNumber, 'userID': (JSON.parse(data["user_id"])["$oid"]).toString()},
          rememberMe: 'local',
        })
        const userData = new FormData
        userData.append("uname", username)
        userData.append("fname", fname)
        userData.append("lname", lname)
        userData.append("day", day)
        userData.append("month", month)
        userData.append("year", year)
        userData.append("wallet", userFromMagic.publicAddress)
        userData.append("phoneNumber", phoneNumber)
        const res = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/create_user', {
          method: "POST",
          body: userData
        })
        const data = await res.json();
        await index.saveObject({
          objectID: username,
          fname: fname,
          lname: lname,
          profilePic: "https://github.com/Oustro/OustroImages/blob/main/people.png?raw=true"
        })
        setUser(user)
        setUserExtra(userFromMagic);
        setLoading(false)
        Router.push('/onboard');
      }
    } catch (e) {
      setLoading(false)
      setError(e.message)
    }
  }

  async function validateForm() {
    if (fname === '' || lname === '' || month === '' || day === '' || year === '' || phoneNumber === '') {
      throw new Error('Missing Required Fields');
    }

    // fix fname fix lname fix uname
    let first = fname.slice(0, 1).toUpperCase() + fname.slice(1).toLowerCase()
    let last = lname.slice(0, 1).toUpperCase() + lname.slice(1).toLowerCase()
    setFName(first)
    setLName(last)

    let u = username
    setUsername(u.toLowerCase())

    //make sure date is valid
    const currDate = new Date();
    let currYear = currDate.getFullYear();

    // checking lengths of the inputs
    if (month.length !== 2 || day.length !== 2 || year.length !== 4) {
      setError('Please input a month like 12, day like 06, and month like 2001')
      return
    }

    let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // making sure no negative numbers or 0
    if (parseInt(day) <= 0 || parseInt(month) <= 0 || parseInt(year) <= 0) {
      setError('Days, Months, and Years cannot be less than 0')
      return
    }
    // making sure not past 12 months
    if (parseInt(month) > 12) {
      setError('Months cannot be greater that 12')
      return
    }

    // if the leap year and feb, check whether it is less than 29
    if (parseInt(month) === 2 && parseInt(year) % 4 === 0) {
      if (29 < parseInt(day)) {
        setError("Even though it's a leap year, that day doesn't exist")
        return
      }
    } 

    // if not a leap year and not feb, making sure day is within month
    else {
      if (ListofDays[parseInt(month) - 1] < parseInt(day)) {
        setError("That day doesn't exist")
        return
      }
    }

    // making sure greater than 13
    if (parseInt(year) > parseInt(currYear) - 13) {
      setError('You seem to be too young to use The Birthday App')
      return
    }
    else if (parseInt(year) === parseInt(currYear) - 13) {
      if (parseInt(month) > parseInt(currDate.getMonth()) + 1) {
        setError('You seem to be too young to use The Birthday App')
        return
      }
      else if (parseInt(month) === parseInt(currDate.getMonth()) + 1) {
        console.log(parseInt(currDate.getDate()))
        if (parseInt(day) > parseInt(currDate.getDate())) {
          setError('You seem to be too young to use The Birthday App')
          return
        }
      }
    } 

    // make sure phone number not associated with another account and is valid
    if (phoneNumber.length !== 10) {
      throw new Error('Invalid Phone Number');
    }
    const phoneCheck = new FormData
    phoneCheck.append("number", phoneNumber)
    const resCheckPhoneNumber = await fetch(process.env.NEXT_PUBLIC_SERVER_URL+'/check_phone_number', {
      method: "POST",
      body: phoneCheck
    })
    const phoneUsed = await resCheckPhoneNumber.json();
    if (phoneUsed["status"]) {
      throw new Error('Phone number already used');
    }
  }

  const setMonthField = (e) => {
    setMonth(e.target.value)
    const nextfield = document.querySelector(
      `input[id=day]`
    );
    if (e.target.value.length == 2) {
      nextfield.focus();
    }
    console.log(month)
  }

  const setDayField = (e) => {
    setDay(e.target.value)
    const nextfield = document.querySelector(
      `input[id=year]`
    );
    if (e.target.value.length == 2) {
      nextfield.focus();
    }
    console.log(month)
  }

  return (
    <div className="bg-hero h-screen p-8">
      <div className='mx-auto flex justify-center'>
        <div className="flex justify-end mt-32 items-center p-0">
          <span className="font-bold cursor-pointer text-4xl">
            Here We Go!
          </span>
        </div>
      </div>
      <Transition
      show={nameCard}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className='mt-8'>
          <label
          className="block text-sm font-bold mb-2"
          htmlFor="fname"
          >
            What's your name?
          </label>
          <input
            className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
            id="fname"
            type="text"
            placeholder="First Name"
            value={fname}
            disabled={loading}
            onChange={(e) => setFName(e.target.value)}
          />
          <input
            className="shadow appearance-none mt-4 border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
            id="lname"
            type="text"
            placeholder="Last Name"
            value={lname}
            disabled={loading}
            onChange={(e) => setLName(e.target.value)}
          />
          <button className='btn-yellow mt-12 mb-0 w-full p-2 text-2xl items-center mx-auto' disabled={loading} onClick={getBday}>
            Next
          </button>
          <div className='mx-auto flex justify-center'>
            <div className="flex justify-end items-center p-0">
              <Link href="/login">
                <p className="pt-10 font-bold">I have an Account</p>
              </Link>
            </div>
          </div> 
          <div className='mx-auto flex justify-center'>
            <div className="flex justify-end items-center p-0">
              <p className="text-red-500 pt-10 font-bold">{error}</p>
            </div>
          </div> 
        </div>
      </Transition>
      <Transition
      show={bdayCard}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className='mt-8'>
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="fname"
          >
            When's your birthday? 
          </label>
          <div className="mb-4 inline-flex space-x-2">
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="month"
              type="number"
              pattern="[0-9]*" 
              maxLength="2"
              placeholder="MM"
              value={month}
              disabled={loading}
              onChange={setMonthField}
            />
            <p className='text-2xl'>/</p>
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="day"
              type="number"
              pattern="[0-9]*" 
              maxLength="2"
              placeholder="DD"
              value={day}
              disabled={loading}
              onChange={setDayField}
            />
            <p className='text-2xl'>/</p>
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="year"
              type="number"
              pattern="[0-9]*" 
              maxLength="4"
              placeholder="YYYY"
              value={year}
              disabled={loading}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <button className='btn-yellow mt-12 mb-0 w-full p-2 text-2xl items-center mx-auto' disabled={loading} onClick={getUname}>
            Next
          </button>
          <div className='mx-auto flex justify-center'>
            <div className="flex justify-end items-center p-0">
              <p className="text-red-500 pt-10 font-bold">{error}</p>
            </div>
          </div> 
        </div>
      </Transition>
      <Transition
      show={usernameCard}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className='mt-8'>
          <label
          className="block text-sm font-bold mb-2"
          htmlFor="fname"
          >
            Choose a username
          </label>
          <input
            className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            disabled={loading}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className='btn-yellow mt-12 mb-0 w-full p-2 text-2xl items-center mx-auto' disabled={loading} onClick={getPhoneNumber}>
            Next
          </button>
          <div className='mx-auto flex justify-center'>
            <div className="flex justify-end items-center p-0">
              <p className="text-red-500 pt-10 font-bold">{error}</p>
            </div>
          </div> 
        </div>
      </Transition>
      <Transition
      show={phoneNumberCard}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className='mt-8'>
          <label
          className="block text-sm font-bold mb-2"
          htmlFor="fname"
          >
            What's your phone number?
          </label>
          <input
            className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
            id="number"
            type="number"
            pattern="[0-9]*" 
            maxLength="10"
            placeholder="1234567890"
            value={phoneNumber}
            disabled={loading}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className='btn-yellow mt-12 mb-0 w-full p-2 text-2xl items-center mx-auto' disabled={loading} onClick={getPassword}>
            Next
          </button>
          <div className='mx-auto flex justify-center'>
            <div className="flex justify-end items-center p-0">
              <p className="text-red-500 pt-10 font-bold">{error}</p>
            </div>
          </div> 
        </div>
      </Transition>
      <Transition
      show={passwordCard}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className='mt-8'>
          <label
          className="block text-sm font-bold mb-2"
          htmlFor="fname"
          >
            Choose a password
          </label>
          <div className="relative">
            <input
            className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="*******"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pl-3">
              <button className='btn-white' onClick={() => setShowPassword(o => !o)}>
                {showPassword ? (
                  <IoEyeOff />
                ) : (
                  <IoEyeOutline />
                )}
              </button>
            </div>
          </div>
          <button className='btn-yellow mt-12 mb-0 w-full p-2 text-2xl items-center mx-auto' disabled={loading} onClick={goReview}>
            Review
          </button>
          <div className='mx-auto flex justify-center'>
            <div className="flex justify-end items-center p-0">
              <p className="text-red-500 pt-10 font-bold">{error}</p>
            </div>
          </div> 
        </div>
      </Transition>
      <Transition
      show={reviewCard}
      enter="transition-transform	duration-[400ms]"
      enterFrom="-translate-x-96"
      enterTo="-translate-x-0"
      leave="transition-transform	duration-[400ms]"
      leaveFrom="-translate-x-0"
      leaveTo="translate-x-96"
      >
        <div className='mt-8'>
          <label
            className="block text-sm font-bold mb-2 mt-8"
            htmlFor="name"
          >
            Your Name
          </label>
          <div className="mb-4 inline-flex space-x-2">
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="fname"
              type="text"
              placeholder="First Name"
              value={fname}
              disabled={loading}
              onChange={(e) => setFName(e.target.value)}
            />
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="lname"
              type="text"
              placeholder="Last Name"
              value={lname}
              disabled={loading}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
          <label
            className="block text-sm font-bold mb-2"
            htmlFor="month"
          >
            Your Birthday
          </label>
          <div className="mb-4 inline-flex space-x-2">
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="month"
              type="number"
              pattern="[0-9]*" 
              maxLength="2"
              placeholder="MM"
              value={month}
              disabled={loading}
              onChange={(e) => setMonth(e.target.value)}
            />
            <p className='text-2xl'>/</p>
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="day"
              type="number"
              pattern="[0-9]*" 
              maxLength="2"
              placeholder="DD"
              value={day}
              disabled={loading}
              onChange={(e) => setDay(e.target.value)}
            />
            <p className='text-2xl'>/</p>
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outlinee"
              id="year"
              type="number"
              pattern="[0-9]*" 
              maxLength="4"
              placeholder="YYYY"
              value={year}
              disabled={loading}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              disabled={loading}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="number"
            >
              Phone Number
            </label>
            <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="number"
              type="number"
              pattern="[0-9]*" 
              maxLength="10"
              placeholder="1234567890"
              value={phoneNumber}
              disabled={loading}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
              className="shadow appearance-none border-lg bg-gray-200 rounded w-full p-2 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pl-3">
                <button className='btn-white' onClick={() => setShowPassword(o => !o)}>
                  {showPassword ? (
                    <IoEyeOff />
                  ) : (
                    <IoEyeOutline />
                  )}
                </button>
              </div>
            </div>
          </div>
          <button
            disabled={loading}
            className="btn-yellow mt-12 mb-0 w-full p-2 text-2xl items-center mx-auto"
            onClick={handleSignUp}
          >
            {loading ? 'Signing Up ...' : 'Sign Up'}
          </button>
          <div className='mx-auto flex justify-center'>
            <div className="flex justify-end items-center p-0">
              <p className="text-red-500 pt-10 font-bold">{error}</p>
            </div>
          </div> 
        </div>
      </Transition>
    </div>
  )
}

export default SignUp;
