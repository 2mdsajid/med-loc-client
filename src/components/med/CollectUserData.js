import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TYPEOFTEST from '../Testtype';
import ShowTIme from './re-comp/ShowTIme';
import Countdown from 'react-countdown'
import Timer from './re-comp/Timer';

import ROOT from '../Const';

import { loadlocalStorage, storelocalStorage, updateTestIdsInLocalStorage } from './functions';

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

    const [alreadygiventest, setalreadygivenTest] = useState(false)

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
        desiredTime.setMinutes(0); // Set the minutes to 0
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
            return <button className='bg-starttestcolor p-1 rounded-md border-pcolor text-pcolor font-semibold drop-shadow-md hover:bg-pcolor hover:text-white my-3 ' onClick={startQuiz}>start test</button>
        } else {
            // uncomment --------------------------------------
            return <>{showstarttestButton ?
                <button className='bg-starttestcolor border p-1 rounded-md border-pcolor text-pcolor font-semibold hover:bg-pcolor hover:text-white ' onClick={startQuiz}>start test</button>
                : <p><span className='text-lg  font-bold'>Test starts in - </span>{<Timer expiryTimestamp={Date.now() + timeForTheTest} onExpire={handleCountdownComplete} />}
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

        // console.log('test data', typeoftest)


        const logintoken = Cookies.get("logintoken")

        const testids = []

        if (logintoken) {
            const userinfo = await loadlocalStorage('userinfo')
            console.log('userinfo',userinfo)

            if (userinfo.id) {


                // const testid = await loadlocalStorage('testsid')

                userinfo.tests.map((test) => {
                    testids.push(test.testid)
                })

                console.log('testids',testids)
                console.log('typeoftest.id',typeoftest._id)



                if (testids.includes(typeoftest._id)) {
                    console.log('already given test')
                    setalreadygivenTest(true)
                } else {
                    console.log('first test')
                    setuserName(userinfo.username)
                    setuserloggedIn(true)

                }






            }
        } else {
            const testid = await loadlocalStorage('testsid')

            // console.log(testid)

            if (testid) {
                if (testid.includes(typeoftest._id)) {
                    // console.log('already given test');
                    setalreadygivenTest(true)
                } else {
                    updateTestIdsInLocalStorage(typeoftest._id);
                }
            } else {
                updateTestIdsInLocalStorage(typeoftest._id)
            }

        }

        //     try {
        // const res = await fetch(ROOT + '/getusername', {
        //     // mode: 'no-cors',
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         logintoken: logintoken
        //     })
        // })
        //         const data = await res.json()

        //         if (data.status != 401) {
        //             setuserName(data.username)
        //             setuserloggedIn(true)
        //         }
        //     } catch (error) {
        //         console.log(error)
        //     }
    }


    const startQuiz = () => {


        // console.log('svjnsdljz')

        if (typeoftest.username) { //checking if the username is provided or not
            history(`/test/${typeoftest.testname}/${username}`, { state: { typeoftest: typeoftest } })
            console.log('start quiz')
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

        {alreadygiventest ? <div className='h-full w-full text-lg font-bold flex flex-col items-center justify-center'><p>Already given the test</p><button className='my-5 p-1 bg-notebg rounded-lg font-semibold drop-shadow-md hover:bg-pcolor hover:text-white' onClick={() => history('/test')}>Back To Tests</button></div> : <div className='w-full h-full border sm:grid sm:place-items-center'>
            <div id='test' className='pl-3 pt-5  sm:bg-notebg drop-shadow-xl rounded-lg border-black sm:w-1/2 md:w-2/5 xl:w-2/5'>
            <p className='text-xl'><span className='font-bold'>Name of Test :</span> {typeoftest.testtitle}</p>
                {userloggedin && <p className='text-xl'><span className='font-bold'>User :</span> {username}</p>}
                {typeoftest.physics && <p className='text-xl'><span className='font-bold'>Physics :</span> {typeoftest.physics} questions</p>}
                {typeoftest.chemistry && <p className='text-xl'><span className='font-bold'>Chemistry :</span> {typeoftest.chemistry} questions</p>}
                {typeoftest.biology && <p className='text-xl'><span className='font-bold'>Biology :</span> {typeoftest.biology} questions</p>}
                {typeoftest.mat && <p className='text-xl'><span className='font-bold'>MAT :</span> {typeoftest.mat} questions</p>}
                {typeoftest.time.duration && <p className='text-xl'><span className='font-bold'>Duration :</span> {typeoftest.time.duration} Minutes</p>}


                {/* if user logged no input || username from userdatabase */}
                {!userloggedin && <div className='mt-5 mb-5'><input className='border border-pcolor p-0.5 pl-1 mr-5 mb-5' type="text" placeholder="your name" name='c'
                    value={username}
                    onChange={(e) => setuserName(e.currentTarget.value)}
                /><button className=' bg-rndmnamecolor py-0.5 px-3 text-pcolor font-bold rounded-lg hover:bg-slate-800 hover:text-white' onClick={generateRandom}>generate random name</button>
                </div>}
                <ShowTime time={typeoftest.time} />
                {/* {showstarttestButton ? <button onClick={startQuiz}>start test</button> : <> </>} */}
                <p className='my-5 text-red-600 font-semibold'>{nonamewarning}</p>
            </div>
        </div>}



    </div>
    )
}

export default CollectUserData
