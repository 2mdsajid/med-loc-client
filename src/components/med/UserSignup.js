import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import ROOT from '../Const';

function UserSignup() {

  const history = useNavigate()

  // DEFINING A USER IN JSON FORMAT TO STORE INPUT DATA
  const [user, setUser] = useState({
    username: '', email: '', password: ''
  })

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


    if (data.status === 422 || !data) {
      console.log('invalid')
    } else {
      console.log('success')

      Cookies.set('logintoken', data.usertoken)

      history('/userprofile')

    }

  }

  return (
    <div className='bg-pcolor  w-screen h-screen grid place-content-center'>
      <div className='w-fit h-fit p-5 rounded-md bg-blue-200 flex flex-col justify-center items-center border border-pcolor'>
        <h3 className='font-bold my-3 text-xl'>SIGNUP</h3>
          <form method='POST' className="signup-form w-full px-1.5 py-1 flex flex-col justify-center items-center" id='signup-form'>
            <input className='w-full my-3 px-2 py-1 rounded-md' type="text" placeholder="full name" name='username'
              value={user.username}
              onChange={handleInput}
            />
            <input className='w-full my-3 px-2 py-1 rounded-md' type="text" placeholder="email" name='email'
              value={user.email}
              onChange={handleInput}
            />
            <input className='w-full my-3 px-2 py-1 rounded-md' type="password" placeholder="password" name='password'
              value={user.password}
              onChange={handleInput}
            />
            <input className='w-full my-4 py-1 border border-pcolor bg-pcolor text-white font-bold rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer' id='sign-up' type="submit" value="Sign Up" onClick={userSignup} />
          </form>
          <p className='text-sm font-semibold'>Already a user? <span><Link className=' text-blue-500 cursor-pointer' to="/login">LOGIN HERE</Link></span></p>
      </div>
    </div>
  )
}

export default UserSignup
