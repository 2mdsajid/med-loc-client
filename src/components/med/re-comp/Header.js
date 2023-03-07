import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom';

const SupraHeader = (props) => {

  return (
    <div className="bg-pcolor h-14 w-screen flex items-center justify-between">
      <h1 className='font-bold ml-3 text-xl text-txt'><Link to='/home'> MEDLOCUS </Link></h1>
      <h1 className='font-bold mr-3 text-xl text-white'>Student</h1>
    </div>
  )
}


function Header() {

  const [showlist, setshowList] = useState('hidden ')
  const toggleShowList = () => {
    if (showlist === 'hidden ') {
      return setshowList('show')
    }
    return setshowList('hidden ')
  }

  return (
    <div className='bg-navbg text-white flex sticky w-screen h-14  top-0 z-10 transition-all ease-linear duration-900'>
      <div className='h-full w-full flex justify-between items-center'>
        <ul className={showlist+'  px-3 font-bold text-black bg-navbg absolute top-14 w-full flex flex-col sm:flex-row sm:my-0 sm:px-0 sm:static sm:w-1/2 sm:ml-3 sm:flex sm:justify-between md:w-2/5 lg:w-1/3 xl:w-1/4 '}>
          <Link to='/home' className='my-3 sm:my-0'>HOME</Link>
          <Link to='/test' className='my-3 sm:my-0'>TESTS</Link>
          <Link to='/notes' className='my-3 sm:my-0'>NOTES</Link>
          <Link to='/confusingterms' className='my-3 sm:my-0'>CONFUSING TERMS</Link>
        </ul>
        <Link to='/userprofile' className='mr-5 ml-3 font-bold text-profcolor'>PROFILE</Link>
      </div>
      <div className='sm:hidden'><IconButton className='border flex items-center justify-center ease-in duration-300' ><MenuIcon style={{fontSize:'2.5rem'}} onClick={toggleShowList}></MenuIcon></IconButton></div>
    </div>
  )
}

export default Header
export { SupraHeader }
