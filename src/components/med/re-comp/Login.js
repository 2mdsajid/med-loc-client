import React from 'react'

import { Link } from 'react-router-dom'

function Login({setEmail,setPassword,userLogin}) {
  return (
    <div className='w-fit h-fit p-5 rounded-md bg-blue-200 flex flex-col justify-center items-center border border-pcolor'>
        <h3 className='font-bold my-3 text-xl'>login</h3>
        <form className=' w-full px-1.5 py-1 flex flex-col justify-center items-center' onSubmit={userLogin} action="" method="post">
          <input className='w-full my-3 px-2 py-1 rounded-md' type="text" placeholder='email'
            onChange={(e) => setEmail(e.currentTarget.value)} />
          <input className='w-full mb-3 px-2 py-1 rounded-md' type="text" placeholder='password'
            onChange={(e) => setPassword(e.currentTarget.value)} />
            <p className='text-sm font-semibold cursor-pointer'>Forgotten Password?</p>
          <input className='w-full my-4 py-1 border border-pcolor bg-pcolor text-white font-bold rounded-lg hover:bg-blue-500 hover:text-white cursor-pointer' type="submit" value="log in" />
        </form>
        <p className='text-sm font-semibold'>Not a user? <Link className=' text-blue-500 cursor-pointer' to='/signup'>Do a quick signup</Link></p>
      </div>
  )
}

export default Login
