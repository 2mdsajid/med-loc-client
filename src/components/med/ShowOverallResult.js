import React from 'react'
import { useLocation } from 'react-router-dom';

import { SupraHeader } from './re-comp/Header';

import { formatDate } from './functions';

function ShowOverallResult() {

  const location = useLocation()

  const selectedtest = location.state.typeoftest;
  const sortedUsers = selectedtest.usersattended
  if (sortedUsers){

    const sortedUsers = selectedtest.usersattended.sort((a, b) => b.totalscore - a.totalscore);
  }
  const numberofquestions = Number(selectedtest.biology) + Number(selectedtest.physics) + Number(selectedtest.chemistry) + Number(selectedtest.mat)

  console.log(selectedtest.date)


  return (
    <div className='min-h-screen w-screen bg-testbg '>
      <SupraHeader />
      <div className='w-full h-full px-5 flex flex-col justify-center items-center'>
        {/* test info */}
        <p className='text-2xl font-bold my-5'>Test Info</p>


        <div className=' w-full sm:w-4/5 lg:w-3/5 xl:w-1/2 bg-notebg  p-3 rounded-md drop-shadow-md'>
          <p><span className='text-lg font-semibold'>Name of the Test : </span>{selectedtest.testtitle}</p>
          <p><span className='text-lg font-semibold'>Test Code : </span>{selectedtest.testname}</p>
          {sortedUsers && <p><span className='text-lg font-semibold'>Number of Participants : </span>{selectedtest.usersattended.length}</p>}
          <p><span className='text-lg font-semibold'>Number of Questions : </span>{numberofquestions}</p>
          <p><span className='text-lg font-semibold'>Duration : </span>{selectedtest.time.duration} Hour</p>
          <p><span className='text-lg font-semibold'>Date : </span>{formatDate(selectedtest.date)}</p>
        </div>

        {/* result */}
        <p className='text-2xl font-bold my-5'>Test Result</p>
        <div className='w-full sm:w-4/5 lg:w-3/5 xl:w-1/2  border border-b-0 border-pcolor'>

          {/* individual row of result */}
          <div className='flex justify-between p-1 bg-pcolor text-white'>
            <p>Rank</p>
            <p>Student Name</p>
            <p>Score</p>
          </div>

          {sortedUsers && sortedUsers.map((user,index) => {
            return (
              <div className='flex justify-between p-1 font-semibold border-b border-pcolor'>
                <p>{index+1}</p>
                <p>{user.username}</p>
                <p>{user.totalscore}</p>
              </div>
            )
          })}



        </div>

      </div>

    </div>
  )
}

export default ShowOverallResult
