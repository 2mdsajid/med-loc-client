import React from 'react'
import { SupraHeader } from './re-comp/Header'

function AdminPanel() {
    return (
        <div className='w-screen min-h-screen bg-testbg'>
            <SupraHeader />
            <div className='w-full h-full'>
                <div className=' w-full max-h flex flex-wrap p-2 items-center justify-center'>
                    <button id='addquestion' className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>Add questions</button>
                    <button id='addtest' className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>Add New Test</button>
                    <button id='addnote' className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>Add notes</button>
                    <button id='viewstatus' className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>View Status</button>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel
