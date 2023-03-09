import React, { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Countdown from 'react-countdown'
import Timer from './re-comp/Timer'
import { storelocalStorage, loadlocalStorage, updatelocalStorage } from './functions'

import ROOT from '../Const';

import { SupraHeader } from './re-comp/Header'

// var objData;
function StartQuiz() {

    const history = useNavigate()
    const location = useLocation();

    // DEFAULT ANS ARRAY
    let [defanswers, setdefAns] = useState([])

    // QUESTIONS ARRAY STATES
    // let [arrayofQn, setarrayofQn] = useState([])
    const [questions, setQuestions] = useState([])
    const [phyqns, setPhyQuestions] = useState([])
    const [bioqns, setBioQuestions] = useState([])
    const [chemqns, setChemQuestions] = useState([])
    const [matqns, setMatQuestions] = useState([])

    // QNATTEMPT & THEIR ANSWERS(OBJECT)
    const [ansobject, setansObject] = useState({})
    const [qnattempt, setqnAttempt] = useState(0)
    const [rightscore, setrightScore] = useState(0)
    const [wrongscore, setwrongScore] = useState(0)

    // TOTALTIME AND TIMELEFT
    const [timeleft, settimeLeft] = useState(null)
    const [remtime, setremTime] = useState(null)
    const [totaltime, settotalTime] = useState(0)
    const [expiryTimestamp, setExpiryTimestamp] = useState(Date.now() + totaltime);

    const [localstoragetime, setlocalstorageTime] = useState(null)
    const [timechangeState, settimechangeStata] = useState(false)

    // DEFINING THE TEST OBECT FOR THE CURRENT TEST 
    const [test, setTest] = useState({})

    // TO CLICK BUTTON ON TIME END
    const [buttonClicked, setButtonClicked] = useState(false);

    // TO USE THE DOM ELEMENT EVENTS
    const inputRef = useRef();

    const showCountDown = async (timearray) => {

        // console.log('totaltime in show cd before if-else', totaltime)

        if (timearray.type === 'free') {
            const time = (Number(timearray.duration )*1000)
            // console.log('timearray', time)
            settotalTime(time)
            // console.log('totaltime in showCD free', totaltime)
        }

        else if (timearray.type === 'timed') {
            const desiredTime = new Date();
            desiredTime.setHours((Number(timearray.value) + Number(timearray.duration)))
            // desiredTime.setHours(18)
            desiredTime.setMinutes(51)
            desiredTime.setSeconds(0)
            // console.log('desired hr in ', desiredTime.getHours())
            const desiredTimeInSeconds = Math.floor(desiredTime.getTime() / 1000);
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);

            const timeForTheTest = (desiredTimeInSeconds - currentTimeInSeconds) * 1000;

            settotalTime(timeForTheTest)
            // console.log('time for test dt', timeForTheTest)
            // console.log('totaltime in showCD timed', totaltime)


            // const timeForTheTest = (desiredTimeInSeconds - currentTimeInSeconds) * 1000;
            // console.log(desiredTimeInSeconds, currentTimeInSeconds, timeForTheTest)
        }
    }


    const handleCountdownComplete = () => {
        inputRef.current.click()
        inputRef.current.blur()
        // settotalTime(0)
        console.log('totaltime in handle countdown', totaltime)
        // console.log('totaltime',ttime)
        // console.log('out')
    }


    /* GET INPUT FROM CLICKING THE ANSWERS */
    const getInput = (e) => {
        // console.log(test)
        const value = e.currentTarget.value
        const id = e.currentTarget.id
        const index = e.currentTarget.name

        // GET LENGTH ON ANSOBJECT
        ansobject[id] = value
        const ansObjLength = Object.keys(ansobject).length
        setqnAttempt(ansObjLength)

        questions.map((question) => {
            if (question._id == id) {
                question.uans = value
                // console.log('question matched', question)
            } else if (!question.uans) {
                question.uans = 'nan'
                // console.log(question)
            }
        })


        // not needed anymore---------------------
        // defanswers.map((defanswer) => {
        //     if (defanswer.id === id) {
        //         if (defanswer.ans === value) {
        //             console.log('right')
        //             setqnScore(qnscore + 1)
        //         } else {
        //             setqnwrScore(qnwrscore + 1)
        //             console.log('wrong')
        //         }
        //     }
        // })
    }

    /* FUNCTION TO FETCH DATA ACCORDING TO SUBJECT */
    // const fetchSubjectData = async (subject, num) => {

    //     // console.log('fetch qn in start quiz')

    //     // console.log(subject)
    //     const res = await fetch(`/get${subject}question`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({ [subject]: num })
    //     });

    //     const data = await res.json();
    //     if (data.status === 422 || !data) {
    //         console.log(`fail to fetch ${subject.toLowerCase()}`);
    //     } else {
    //         console.log(`success ${subject.toLowerCase()}`);
    //         return data;
    //     }
    // };

    /* ON-CLICK EVENT OF FRM TO CALL THE ABOVE FUNCTION AND FETCH THE DATA */
    const renderQuestion = async () => {

        // TO GET THE TEST DATA FROM PREV PAGE
        const selectedTest = await location.state.typeoftest;
        setTest(selectedTest)

        console.log('renderqn in start quiz')

        const res = await fetch(`${ROOT}/getallquestion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                physics: selectedTest.physics,
                chemistry: selectedTest.chemistry,
                biology: selectedTest.biology,
                mat: selectedTest.mat
            })
        });

        const data = await res.json();

        const arrayofqn = [...data.bio, ...data.chem, ...data.phy, ...data.mat];

        setQuestions(arrayofqn)

        // console.log('selected test time value', selectedTest.time.value)
        settotalTime(selectedTest.time.value * 1000)
        // console.log('totaltime in renderqn function', totaltime)

        showCountDown(selectedTest.time)

        if (data.status === 402 || !data) {
            console.log(`fail to fetch questions`);
        } else {
            console.log(`success in fetching the questions`);
            return data;
        }


        /* THIS TO GET QUESTIONS IN SUBJECT WISE
        MANY REQUESTS WERE SENT AND RECEIVED SO LAGGY SO COMMENTED OUT */
        // // const bioData = await fetchSubjectData('biology', selectedTest.biology);
        // setBioQuestions(data.bio);

        /* ANSWERS ARRAY */
        // not needed anymore--------------------------------
        // questions.map((array) => {
        //     // console.log('ansssssss')
        //     const ansObj = {
        //         id: array._id, ans: array.ans
        //     }
        //     setdefAns(prevArray => [...prevArray, ansObj])
        // })
    }





    /* CHECK ANSWERS ON/WHLE SUMBITTING THE ANSWERS */
    const checkAnswers = async (e) => {

        e.preventDefault();
        // console.log('submitted')

        // await calcu()

        test.totaltimetaken = totaltime
        // console.log('timeleft', timetaken)

        const objData = {
            testmode: test.testname,
            totalscore: rightscore,
            totalwrong: wrongscore,
            totaltimetaken: totaltime
        }

        console.log('test data in check answer', test)

        history(`/test/${test.testname}/${test.username}/result`, { state: { questions: questions, test: test } })

    }

    useEffect(() => {
        renderQuestion()
        // console.log('use effect start quiz page')
        console.log('totaltime in useeffect', totaltime)

    }, []);

    return (
        <div className='bg-testbg  w-screen'>
            <SupraHeader />
            <div className=" flex px-3 w-fit sm:w-full sm:px-10 md:px-20 lg:px-32 xl:px-40">
                <div className="left h-auto p-1.5 border border-pcolor rounded-xl bg-sky-500 fixed top-44 right-2 sm:right-5 md:right-16 lg:right-24 xl:right-36">
                    <p className='font-semibold underline text-2xl'>status</p>
                    <p><span className='font-semibold'>Name :</span> {test.username}</p>
                    <p><span className='font-semibold'>Qn attempt =</span> {qnattempt}</p>
                    {totaltime > 0 && <Timer expiryTimestamp={Date.now() + totaltime} onExpire={handleCountdownComplete} />}
                </div>
                <div className="middle w-full flex flex-col">
                    <div className=' grid place-items-center'>
                        <p className='w-fit bg-pcolor text-white p-1 my-1.5 rounded-md'>Questions</p>
                    </div>

                    <div className='w-full mb-5'>
                        <div className='h-full w-full bg-green-400 p-1 border border-pcolor rounded-lg'>
                            <h1 className='font-bold text-xl'>Details of the Test :</h1>
                            <p><span className='text-lg font-semibold'>Name :</span>&nbsp; {test.testtitle} </p>
                            <p><span className='text-lg font-semibold'>Duration :</span> &nbsp; {totaltime/1000} minutes</p>
                        </div>
                    </div>
                    <form onSubmit={checkAnswers} action="" method="POST">
                        {
                            questions.map((question, index) => {
                                return (<div className="question mb-5 bg-testbg">
                                    <p className="qn font-bold text-lg"><span className="qn-num">Q.{index + 1}. </span> {question.qn} </p>
                                    {question.img && <img className='m-3' style={{ height: '200px' }} src={question.img} alt="Question Image" />}
                                    <div className='flex items-center'><input className='ml-3 w-5 h-5 cursor-pointer' onChange={getInput} type="radio" id={question._id} name={index} value='a' /><label className='ml-2 text-lg font-semibold' for="huey">{question.a}</label></div>
                                    <div className='flex items-center'><input className='ml-3 w-5 h-5 cursor-pointer' onChange={getInput} type="radio" id={question._id} name={index} value='b' /><label className='ml-2 text-lg font-semibold' for="sth">{question.b}</label></div>
                                    <div className='flex items-center'><input className='ml-3 w-5 h-5 cursor-pointer' onChange={getInput} type="radio" id={question._id} name={index} value='c' /><label className='ml-2 text-lg font-semibold' for="sth3">{question.c}</label></div>
                                    <div className='flex items-center'><input className='ml-3 w-5 h-5 cursor-pointer' onChange={getInput} type="radio" id={question._id} name={index} value='d' /><label className='ml-2 text-lg font-semibold' for="sth4">{question.d}</label></div>
                                </div>)
                            })
                        }
                        <div className='w-full flex justify-center'>
                        <button className='bg-starttestcolor text-pcolor font-bold p-1.5 ml-5 my-10 border border-pcolor rounded-md hover:bg-pcolor hover:text-white' type="submit" ref={inputRef}>submit answers</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StartQuiz
