import React from 'react'

import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TelegramIcon from '@mui/icons-material/Telegram';

function Footer() {
  return (
    <div className='bg-footcolor w-screen'>
      <div className='w-full mt-1 flex flex-col items-center sm:items-start sm:flex-row sm:justify-evenly'>
        <div className='flex flex-col items-center justify-center my-2 '>
          <p className='font-bold underline'>TEST</p>
          <Link to='/test'>
            <button>Daily Tests</button>
          </Link>

          <Link to='/test'>
            <button>Model Tests</button>
          </Link>

          <Link to='/test'>
            <button>Chapter Wise</button>
          </Link>
        </div>
        <div className='flex flex-col items-center justify-center my-2 '>
          <p className='font-bold underline border'>USEFUL LINKS</p>
          <Link to='/aboutmedlocus'>
            <button>About Medlocus</button>
          </Link>

          <Link to='/studentsfeedback'>
            <button>Student's Feedback</button>
          </Link>

          <Link to='/contribute'>
            <button>Contribute to Medlocus</button>
          </Link>

        </div>
        <div className='my-3 flex flex-col items-center justify-center'>
          <p className='font-bold underline'>CONTACT</p>
          <div>
            <a href='https://www.facebook.com/medlocusnp' target='_blank'><FacebookIcon fontSize='large' /></a>
            <a href='https://www.youtube.com/@MedLocusYT' target='_blank'><YouTubeIcon fontSize='large' /></a>
            <a href='https://t.me/med_locus' target='_blank'><TelegramIcon fontSize='large' /></a>
          </div>
        </div>
      </div>
      <p className='w-full text-center p-2 text-bgcolor font-bold'>©medlocus 2023 - all rights reserved</p>
    </div>
  )
}

export default Footer
