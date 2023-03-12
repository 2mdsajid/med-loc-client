import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook';

// , onTick = () => { }

function Timer({ expiryTimestamp, onExpire,onTick }) {

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
    if (typeof onTick === 'function') {
      onTick(expiryTimestamp);
    }
  }, [seconds, onTick]);

  return (
  
      <>{`${hours}H : ${minutes}M : ${convertToTwoDigit(seconds)}S`}</>
    

  )
}

export default Timer
