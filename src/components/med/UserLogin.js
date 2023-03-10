import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ROOT from '../Const';

import Login from './re-comp/Login';
import { storelocalStorage } from './functions';

import { SupraHeader } from './re-comp/Header';

import Cookies from 'js-cookie';

function UserLogin({renderuserProfile}) {

  const history = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [invalidmessage,setinvalidMessage] = useState('')
  const [successmessage,setsuccessMessage] = useState('')

  const userLogin = async (e) => {
    e.preventDefault()
  
    const user = {
      email: email,
      password: password
    }

    try {

      const res = await fetch(ROOT + "/userlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })

      const data = await res.json()

      console.log('profile data after login',data)
      
      
      if (data.status === 400 || !data) {
        console.log(data.message)
        setinvalidMessage(data.message)

        setTimeout(() => {

          setinvalidMessage('')
          
        }, 2000);

      } else {

        Cookies.set('logintoken', data.logintoken)
        // console.log('logintoken',data)
        // storelocalStorage('userdaa', data.user) //storing the user data to local storage
        
        storelocalStorage('userinfo',{
          id:data.user.id,
          username:data.user.username,
          email:data.user.email,
          tests:data.user.tests
      })

        setsuccessMessage('success') //success message
        renderuserProfile()
        
        // history('/userprofile')
      }

    } catch (error) {
      // console.log(error)
      history('*')

    }
  }

  return (
  //   <div className='bg-testbg  w-screen h-screen grid place-content-center'>
  // <SupraHeader />
    <div className='w-80 min-h-96 bg-notebg flex flex-col items-center rounded-md drop-shadow-md'>
      <h3 className='font-bold my-5 text-xl'>login</h3>
      <form className=' w-full px-2 mb-5 text-sm flex flex-col justify-center items-center' onSubmit={userLogin} action="" method="post">
        <input className='w-full my-3 px-2 py-1 rounded-md drop-shadow-md outline-none' type="text" placeholder='email'
          onChange={(e) => setEmail(e.currentTarget.value)} />
        <input className='w-full mb-3 px-2 py-1 rounded-md drop-shadow-md outline-none' type="text" placeholder='password'
          onChange={(e) => setPassword(e.currentTarget.value)} />
        <p className='text-sm font-semibold cursor-pointer'>Forgotten Password?</p>
        <input className='w-1/2 my-4 py-1 border border-pcolor bg-pcolor text-white font-bold rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer' type="submit" value="log in" />
      </form>
      <p className='text-sm my-5 mb-8 font-semibold'>Not a user? <Link className=' text-blue-500 cursor-pointer' to='/signup'>Do a quick signup</Link></p>

    {invalidmessage && <p className='my-3 text-md font-semibold text-red-500 '>{invalidmessage}</p>}
    {successmessage && <p className='my-3 text-md font-semibold text-green-500 '>{successmessage}</p>}
    
    </div>
    // </div>
  )
}

export default UserLogin
