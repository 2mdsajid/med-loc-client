import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

function Footer() {
  return (
    <div className='bg-footcolor sm:absolute sm:bottom-0 w-full'>
      <div className='w-full mt-1 flex flex-col items-center sm:items-start sm:flex-row sm:justify-evenly'>
        <div className='flex flex-col my-2 '>
          <p className='font-bold underline'>TEST</p>
          <button>TEST1</button>
          <button>TEST2</button>
          <button>TEST3</button>
          <button>TEST4</button>
        </div>
        <div className='flex flex-col my-2'>
          <p className='font-bold underline'>USEFUL LINKS</p>
          <button>LINK1</button>
          <button>LINK2</button>
          <button>LINK3</button>
          <button>LINK4</button>
        </div>
        <div className='my-3'>
        <p className='font-bold underline'>CONTACT</p>
    <FacebookIcon />
    <YouTubeIcon />
    <TelegramIcon />
        </div>
      </div>
      <p className='w-full text-center p-2 text-bgcolor font-bold'>©medlocus 2023 - all rights reserved</p>
    </div>
  )
}

export default Footer
