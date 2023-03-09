import React from 'react'
import { ParsedElement } from './Notes'
import { Link, useLocation, useNavigate } from "react-router-dom";

import { SupraHeader } from './re-comp/Header';

function SingleNote() {

  const navigate = useNavigate()

  const { state: { note } = {} } = useLocation();
  console.log(note)

  // <div className='note'>
  //     <h2>{note.title}</h2>
  //     <hr/>
  //     <div className='notecontent'><ParsedElement string={note.notecontent} root={note.rooturl} /></div>
  //   </div>

  return (
    <div className='min-h-screen w-screen bg-testbg'>
      <SupraHeader />

      <div className='mx-auto w-full md:w-2/3 lg:w-1/2 h-full p-5 flex flex-col justify-center items-center'>
        <p className=' p-2 text-xl font-bold'>{note.title}</p>
        <p className='singlenote bg-notebg p-3 rounded-xl drop-shadow-md'><ParsedElement string={note.notecontent} root={note.rooturl} /></p>
        <button className='my-10 p-2 font-bold bg-slate-300 rounded-md drop-shadow-lg hover:bg-pcolor hover:text-white ' onClick={() => navigate('/notes')}>Back To Notes</button>
      {/* <button className='p-1 rounded-md bg-gray-300 shadow-xl'>a akfj  njnj button</button> */}
      </div>

    </div>
  )
}

export default SingleNote
