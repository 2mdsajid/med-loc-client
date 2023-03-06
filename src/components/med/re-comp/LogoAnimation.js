import React from 'react'
import { SupraHeader } from './Header'

function LogoAnimation() {
    return (<div className='w-screen h-screen bg-testbg'>
        <SupraHeader />
        <div className='bg-testbg flex items-center justify-center w-full h-full'>
            <img className='animate-bounce w-44' src="/images/logo.png" alt="" />
        </div>
    </div>)
}

export default LogoAnimation
