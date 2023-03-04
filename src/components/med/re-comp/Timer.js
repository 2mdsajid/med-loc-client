import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';


function Timer({ expiryTimestamp, onExpire, onTick = () => { } }) {

  function convertToTwoDigit(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }
  
  const [sec, setSec] = useState(0)

  const {
    seconds,
    minutes,
    hours,
  } = useTimer({ expiryTimestamp, onExpire });

  useEffect(() => {
    setSec(seconds);
    onTick(minutes)
  }, [seconds]); //this will run only if seconds change


  return (
    <div className='flex'>
      <p><span className='font-semibold'>Time Left =</span> {`${hours}H : ${minutes}M : ${convertToTwoDigit(seconds)}S`}</p>
    </div>

  )
}

export default Timer
