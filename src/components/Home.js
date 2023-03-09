import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'; //cookies library

// use link to navigte to a.href || link = href || navigate = redirect
import { Link, useNavigate } from 'react-router-dom'

// import logo from '../images'


// import {Img} from 'react-image' //to use responsive image

// import Imgix from "react-imgix"


function Home() {

  // navigate to a link || similar to href={}
  const history = useNavigate()


  const routenewHome = (e) => {
    e.preventDefault()
    const user_type = e.currentTarget.id //give the input value from the user type

    // storing the cookie about the user-type
    Cookies.set('usertype', user_type, { expires: 99 });

    // to pass to new home page
    history('/home')
  }

  useEffect(() => {

    const user_type = Cookies.get("usertype")
    if(user_type){
      history('/home')
    }

    //Cookies.remove('usertype') //to remove the cookie on returning to this page
  }, []);

  const [value, setValue] = useState(null )
 return (
    <div className='h-screen w-screen bg-pcolor text-white text-2xl sm:text-3xl flex flex-col items-center justify-center'>
      <h1 className='font-bold mb-5'>WELCOME TO <span className='text-medloccolor'>MEDLOCUS</span></h1>
      <img className='mb-5 w-48 sm:w-64 cursor-pointer hover:scale-[1.2] transition-all ease-linear duration-300 ' src="/images/logo.png" alt="" />
      <p className='mb-5'>Continue As</p>
      <button id='aspirant' className='mb-2 p-2 bg-btnbg text-black font-bold hover:bg-blue-400 hover:text-white rounded-md' onClick={routenewHome}>Medical <span className='text-contascolor hover:text-blue'>Aspirant</span></button>
      <button id='student' className='p-2.5 bg-btnbg text-black font-bold hover:bg-blue-400 hover:text-white rounded-md'onClick={routenewHome}>Medical <span className='text-contascolor hover:text-blue'>Student</span></button>
    </div>
  )
}

export default Home
