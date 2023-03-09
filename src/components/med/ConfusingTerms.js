import React from 'react'

import { SupraHeader } from './re-comp/Header'
import LogoAnimation from './re-comp/LogoAnimation'

function ConfusingTerms() {
  return (
    <div className='w-screen min-h-screen bg-testbg'>
      <SupraHeader />
      <LogoAnimation />
      <p className='-mt-[22rem] text-center text-xl font-bold'>COMING SOON...........</p>
    </div>
  )
}

export default ConfusingTerms
