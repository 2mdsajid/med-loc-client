import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ROOT from '../Const';

import { SupraHeader } from './re-comp/Header';

function UserSignup() {

  const history = useNavigate()

  // DEFINING A USER IN JSON FORMAT TO STORE INPUT DATA
  const [user, setUser] = useState({
    username: '', email: '', password: ''
  })

  const [failedmessage,setfailedMessage] = useState('')
  const [successmessage,setsuccessMessage] = useState('')

  //   STORING THE INPUT VALUES IN USER JAOS
  let name, value
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value })
  }


  const userSignup = async (e) => {
    e.preventDefault()

    const { username, email, password } = user

    const res = await fetch(ROOT + "/usersignup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })

    const data = await res.json()


    if (data.status === 400 ||  !data) {
      setfailedMessage(data.message)
      // console.log('invalid')
    } else {
      // console.log('success')
      setsuccessMessage(data.message)
      Cookies.set('logintoken', data.usertoken)

      history('/userprofile')

    }

  }

  return (
    <div className='bg-testbg w-screen min-h-screen'>
      <SupraHeader />
      <div className='w-80 h-[90vh] mx-auto px-3 flex items-center justify-center '>
        <form method='POST' className="bg-notebg p-3 w-full  flex flex-col items-center rounded-md drop-shadow-sm" id='signup-form'>
          <h3 className='font-bold my-5 text-xl'>SIGNUP</h3>
          <input className='w-full my-3 px-2 py-1 rounded-md drop-shadow-md outline-none' type="text" placeholder="full name" name='username'
            value={user.username}
            onChange={handleInput}
          />
          <input className='w-full my-3 px-2 py-1 rounded-md drop-shadow-md outline-none' type="text" placeholder="email" name='email'
            value={user.email}
            onChange={handleInput}
          />
          <input className='w-full my-3 px-2 py-1 rounded-md drop-shadow-md outline-none' type="password" placeholder="password" name='password'
            value={user.password}
            onChange={handleInput}
          />
          <input className='w-1/2 my-4 py-1 border border-pcolor bg-pcolor text-white font-bold rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer' id='sign-up' type="submit" value="Sign Up" onClick={userSignup} />
          <p className='text-md my-5 mb-8 font-semibold'>Already a user? <span><Link className=' text-blue-500 cursor-pointer' to="/userprofile">LOGIN HERE</Link></span></p>

          {failedmessage && <p className='my-3 text-md font-semibold text-red-500 '>{failedmessage}</p>}
    {successmessage && <p className='my-3 text-md font-semibold text-green-500 '>{successmessage}</p>}

        </form>
      </div>
    </div>
  )
}

export default UserSignup
