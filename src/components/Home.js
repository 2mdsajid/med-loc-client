import React, { useEffect, useRef, useState } from 'react'
import Cookies from 'js-cookie'; //cookies library

// use link to navigte to a.href || link = href || navigate = redirect
import { Link, useNavigate } from 'react-router-dom'

// import logo from '../images'

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
    Cookies.remove('usertype') //to remove the cookie on returning to this page
  }, []);


  return (
    <div className='home-main'>
      <h2 className='home1-wlcm'>WELCOME TO <span style={{color:"#01C7F8"}}>MEDLOCUS</span></h2>
      <img className='' src='/images/logo.png' alt="" />
      <h3>CONTINUE AS</h3>
      <button id='aspirant' type='submits' onClick={routenewHome} >Medical <span>Aspirant</span></button>
      <button id='student' type='submits' onClick={routenewHome} >Medical <span>Student</span></button>
    </div>
  )
}

export default Home