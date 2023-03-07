import React from 'react'
import { SupraHeader } from './Header'

function LogoAnimation() {
    return (<div className='w-screen h-screen bg-testbg grid place-content-center'>
        {/* <SupraHeader /> */}

            <img className='animate-bounce w-44' src="/images/logo.png" alt="" />

    </div>)
}

export default LogoAnimation
