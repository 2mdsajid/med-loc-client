import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TYPEOFTEST from '../Testtype';
import ShowTIme from './re-comp/ShowTIme';
import Countdown from 'react-countdown'
import Timer from './re-comp/Timer';

import ROOT from '../Const';

import names from 'random-indian-name'
import Cookies from 'js-cookie';

import { SupraHeader } from './re-comp/Header';
// var names = require();

// GET INPUT FROM THE ANSWERS
// const selecttestType = (typeoftest) => {
//     const selectedTest = TYPEOFTEST.find((type) => type.id === typeoftest);
//     if (!selectedTest) {
//         return;
//     }
//     return selectedTest
// };




const CollectUserData = () => {

    const history = useNavigate()

    const [username, setuserName] = useState('')
    const [nonamewarning, setnonameWarning] = useState('')
    const [userloggedin, setuserloggedIn] = useState(false)
    const [showstarttestButton, setshowstartButton] = useState(false)

    const location = useLocation();
    // typeoftest === selectedtest from prev page
    const typeoftest = location.state.typeoftest;
    // console.log('collectuser data', typeoftest)

    // SETTING  A USERNAME IN THE RECEIVED OBJECT
    typeoftest.username = username

    // TO GET THE TIME VALUE OF THE TEST  
    function ShowTime(props) {


        // const desiredTime = new Date();
        //     desiredTime.setHours(Number(props.time.value))
        //     // desiredTime.setHours(18)
        //     desiredTime.setMinutes(51)
        //     desiredTime.setSeconds(0)
        //     // console.log('desired hr in ', desiredTime.getHours())
        //     const desiredTimeInSeconds = Math.floor(desiredTime.getTime() / 1000);
        //     const currentTimeInSeconds = Math.floor(Date.now() / 1000);

        //     const timeForTheTest = (desiredTimeInSeconds - currentTimeInSeconds) * 1000;


        const desiredTime = new Date();
        // const currentDate = desiredTime.getDate()
        const desiredHour = parseInt(props.time.value)
        //desiredTime.setDate(desiredHour); // Set the date to 1 day next
        desiredTime.setHours(desiredHour); // Set the hour to 4 PM
        desiredTime.setMinutes(16); // Set the minutes to 0
        desiredTime.setSeconds(0); // Set the seconds to 0

        const desiredTimeInSeconds = Math.floor(desiredTime.getTime() / 1000);
        const currentTimeInSeconds = Math.floor(Date.now() / 1000);
        const timeForTheTest = (desiredTimeInSeconds - currentTimeInSeconds) * 1000;
        // console.log(desiredTimeInSeconds, currentTimeInSeconds, timeForTheTest)

        // to show the start-test-button
        const handleCountdownComplete = () => {
            setshowstartButton(true);
            console.log('show btn')
        };


        if (props.time.type === 'free') {
            setshowstartButton(true)
            return <button className='bg-starttestcolor border p-1 rounded-md border-pcolor text-pcolor font-semibold hover:bg-cyan-900 hover:text-white ' onClick={startQuiz}>start test</button>
        } else {
            // uncomment --------------------------------------
            return <>{showstarttestButton ?
                <button className='bg-starttestcolor border p-1 rounded-md border-pcolor text-pcolor font-semibold hover:bg-cyan-900 hover:text-white ' onClick={startQuiz}>start test</button>
                : <p><span className='text-lg  font-bold'>Test starts in - </span>{ <Timer expiryTimestamp={Date.now() + timeForTheTest} onExpire={handleCountdownComplete} />}
                </p>}</>;
            // return <button onClick={startQuiz}>start test</button>
        }
    }

    // generate a random name 
    const generateRandom = () => {
        const rndmname = names({ first: true })
        setuserName(rndmname)
        typeoftest.username = rndmname
        // console.log(typeoftest)
    }

    // TO GET THE USERNAME IF USER LOGGED IN
    const getUserName = async () => {
        const logintoken = Cookies.get("logintoken")
        try {
            const res = await fetch(ROOT + '/getusername', {
                // mode: 'no-cors',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    logintoken: logintoken
                })
            })
            const data = await res.json()

            if (data.status != 401) {
                setuserName(data.username)
                setuserloggedIn(true)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const startQuiz = () => {
        if (typeoftest.username) { //checking if the username is provided or not
            history(`/test/${typeoftest.testname}/${username}`, { state: { typeoftest: typeoftest } })
            // console.log('start quiz')
        } else {
            setnonameWarning('please provide a name')
            const removeNoNameWarning = setTimeout(() => {
                setnonameWarning('')
            }, 2000);
        }

    }

    useEffect(() => {
        getUserName()
    }, [])

    return (<div className='bg-testbg h-screen w-screen flex flex-col'>
        <SupraHeader />
        <div className='w-full h-full border sm:grid sm:place-items-center'>
            <div id='test' className='pl-3 pt-5  sm:bg-notebg drop-shadow-xl rounded-lg border-black sm:w-1/2 md:w-2/5 xl:w-2/5'>
                <h3 className='border border-pcolor text-3xl inline-block p-2.5 my-5 bg-pcolor text-white capitalize rounded-xl'>test type : {typeoftest.testname}</h3>
                {userloggedin && <p className='text-xl'><span className='font-bold'>username :</span> {username}</p>}
                {typeoftest.physics && <p className='text-xl'><span className='font-bold'>Physics :</span> {typeoftest.physics} questions</p>}
                {typeoftest.chemistry && <p className='text-xl'><span className='font-bold'>Chemistry :</span> {typeoftest.chemistry} questions</p>}
                {typeoftest.biology && <p className='text-xl'><span className='font-bold'>Biology :</span> {typeoftest.biology} questions</p>}
                {typeoftest.mat && <p className='text-xl'><span className='font-bold'>MAT :</span> {typeoftest.mat} questions</p>}
                {typeoftest.time.duration && <p className='text-xl'><span className='font-bold'>Duration :</span> {typeoftest.time.value} Minutes</p>}


                {/* if user logged no input || username from userdatabase */}
                {!userloggedin && <div className='mt-5 mb-5'><input className='border border-pcolor p-0.5 pl-1 mr-5 mb-5' type="text" placeholder="your name" name='c'
                    value={username}
                    onChange={(e) => setuserName(e.currentTarget.value)}
                /><button className='border border-pcolor bg-rndmnamecolor py-0.5 px-3 text-pcolor font-bold rounded-lg hover:bg-slate-800 hover:text-white' onClick={generateRandom}>generate random name</button>
                </div>}
                <ShowTime time={typeoftest.time} />
                {/* {showstarttestButton ? <button onClick={startQuiz}>start test</button> : <> </>} */}
                <p className='my-5 text-red-600 font-semibold'>{nonamewarning}</p>
            </div>
        </div>
    </div>
    )
}

export default CollectUserData
