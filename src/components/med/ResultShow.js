import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
// import { objData } from './Quiz'
import ROOT from '../Const';

import { checkAnswer } from './functions';

import ShowAns from './re-comp/ShowAns';
import { SupraHeader } from './re-comp/Header'

import { storelocalStorage } from './functions';

import { Link } from 'react-router-dom';
import { secondsToMinutes } from './functions';


// import React from 'react'

/* 

-attended users -> test collection
-test,scores,time,questions -> usercollection

*/



function ResultShow() {

    const history = useNavigate()

    const [questions, setQuestions] = useState([])
    const [test, setTest] = useState({})
    const [rightscore, setrightScore] = useState(0)
    const [wrongscore, setwrongScore] = useState(0)
    const [unattemptscore, setunattemptScore] = useState(0)

    const [overallresult, setoverallResult] = useState([])
    // show button if it is daily test
    const [showanswer, setshowAnswer] = useState(false)
    const [ansText, setansText] = useState('See Answers')
    const [anstextclass, setanstextClass] = useState('')
    const [showansbtnclass, setshowansbtnClass] = useState('w-fit bg-notebg text-pcolor drop-shadow-md font-bold p-1 my-1.5 rounded-md hover:bg-pcolor hover:text-white')
    const [showoverallresultbtn, setshowoverallresultBtn] = useState(true)
    // const [newresult,setnewResult] = useState([])
    const [objData, setObj] = useState([])
    const [showoverallresult, setshowoverResult] = useState(false)

    const location = useLocation();

    const username = location.state.username;
    const logintoken = Cookies.get("logintoken")

    // SHIW ANSWERS
    const [notloggedtext, setnotloggedText] = useState('')
    const [showloginbutton, setshowloginButton] = useState(false)


    // SAVE TEST DATA IN THE RESPECTIVE USERS DATABASE
    const saveTestToUser = async (testmode, testtitle, totalscore, totalwrong, unattempt, totaltimetaken, questions, testid) => {


        // const { testmode,testtitle,totalscore,totalwrong,unattempt,totaltimetaken,questions} = req.body

        const res = await fetch(ROOT + '/addtestdata', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // since database stores only string form
            body: JSON.stringify({
                logintoken,
                testmode,
                testtitle,
                totalscore,
                totalwrong,
                unattempt,
                totaltimetaken,
                questions,
                testid
            })
        })

        const data = await res.json()

        // console.log('user save',data)

        if (data.status === 400 || !data) {
            console.log(data.message)
        } else if (data.status === 200) {

            storelocalStorage('userinfo', {
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                tests: data.user.tests
            })

            console.log(data.message)
        }
    }


    // PERFORM THE CALCULATIONS
    const calcu = (questions) => {
        questions.map((question) => {
            if (question.ans === question.uans) {
                setrightScore((rightscore) => rightscore + 1)
            } else if (question.uans === 'nan') {
                setunattemptScore((unattemptscore) => unattemptscore + 1)
            } else {
                setwrongScore((wrongscore) => wrongscore + 1)
            }
        })

        return 'question checked'
    }

    // SEND THE TEST DATA TO THE TEST DATABASE
    const saveUserToTest = async (id, username, totalscore) => {
        try {
            const res = await fetch(ROOT + '/saveusertotest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // since database stores only string form
                body: JSON.stringify({ id, username, totalscore })
            })
            const data = await res.json()
            // setoverallResult(data.users)

            if (data.status != 401) {
                return 'attended user sent successfully'
            } else {
                return 'cant send the attended user'
            }
        } catch (error) {
            console.log('attended user save', error)
        }
    }

    const checkLogin = () => {

    }

    const showOverallResult = async (e) => {
        e.preventDefault()

        // console.log(objData.testname)

        try {
            const res = await fetch(ROOT + '/showoverallresult', {
                method: 'POST',
                headers: {
                    // because there is cookies
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },

                // bwcause cookies is there
                credentials: 'include',
                body: JSON.stringify({
                    logintoken: logintoken,
                    testmode: objData.testmode
                })
            })

            const data = await res.json()
            if (data.status !== 401) {
                setoverallResult(data)
                const sortedData = [...overallresult].sort((a, b) => a.totalscore - b.totalscore)
                console.log(sortedData)
                setoverallResult(sortedData)
                setshowoverResult(true)
            } else {
                setnotloggedText('please log in to see overall result')
            }



        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        // console.log('right score changed to useffect2', rightscore);
        // console.log('right score changed to useffect2', wrongscore);
        // console.log('right score changed to useffect2', unattemptscore);
        // console.log('wrong score changed to', wrongscore);
        // console.log('here goes save to user in useeffect 2')

        // {testmode,
        //     testtitle,
        //     totalscore,
        //     totalwrong,
        //     unattempt,
        //     totaltimetaken,
        //     questions}

        if (wrongscore > 0 || rightscore > 0 || unattemptscore > 0) {
            console.log('testid,', test._id)
            const savetesttouserstatus = saveTestToUser(
                test.testname,
                test.testtitle,
                rightscore,
                wrongscore,
                unattemptscore,
                test.totaltimetaken,
                questions,
                test._id
            )

            const saveusertoteststatus = saveUserToTest(
                test._id,
                test.username,
                rightscore
            )

            console.log('res from add test to user', savetesttouserstatus)
            console.log('res from add user to test', saveusertoteststatus)
        }

    }, [rightscore, wrongscore, unattemptscore]);

    useEffect(() => {
        const questions = location.state.questions;
        const test = location.state.test;
        setQuestions(questions)
        setTest(test)

        // console.log('test in result',test)

        // console.log('before question passed to function')
        const res = calcu(questions)
        // console.log('right score in useeffect1',rightscore)
        // console.log('result from fun in use effect', res)

        // setObj(objData)
        // console.log('use effect', test)

        // const { _id, ...newquestions } = questions;


        // console.log('newquestions in useeffect', newquestions)

        // TO SHOW OR HIDE OVERALL RESULT
        if (test.category === 'modeltest') {
            setshowoverallresultBtn(false)
        }
    }, [])


    return (
        <div className='w-screen min-h-screen  bg-testbg'>
            <SupraHeader />
            <div className='w-full sm:flex sm:flex-col sm:items-center px-2 '>
                <p className='text-2xl font-bold my-5'>Results</p>
                <div className=' w-full sm:w-4/5 lg:w-3/5 xl:w-1/2 bg-notebg  p-3 rounded-md drop-shadow-md'>
                    <p className='capitalize'><span className='text-lg font-bold'>User : </span>{test.username}</p>
                    <p><span className='text-lg font-bold'>Test Name : </span>{test.testtitle}</p>
                    <p><span className='text-lg font-bold'>Total Score : </span>{rightscore}</p>
                    <p><span className='text-lg font-bold'>Wrong : </span>{wrongscore}</p>
                    <p><span className='text-lg font-bold'>Not Attempted : </span>{unattemptscore}</p>
                    <p><span className='text-lg font-bold'>Total Time Taken : </span>{secondsToMinutes(test.totaltimetaken)}</p>
                </div>

                <div className='w-full sm:w-4/5 lg:w-3/5 xl:w-1/2 '>
                    <div className='grid place-items-center my-5'>
                        <button className={showansbtnclass} type="submit" onClick={() => {

                            if (logintoken) {
                                setshowAnswer(true)
                                setansText('Answers')
                                setanstextClass('text-2xl font-bold my-5')
                                setshowansbtnClass('')
                            } else {
                                setnotloggedText('You must be logged in to view the answers !')
                            }


                        }}><p className={anstextclass}>{ansText}</p></button>
                    </div>


                    {/* {showoverallresultbtn && <button type="submit" onClick={showOverallResult}>see overall reesult </button>}
                    {showoverallresult ? <h3>Overall Result</h3> : <p style={{ color: 'red' }} >{notloggedtext}</p>}
                    {
                        overallresult.map((result, index) => {
                            return <p>{index}. {result.username} : {result.totalscore}</p>
                        })
                    } */}

                    <div className='my-5 flex flex-col items-center space-x-4 justify-center bg-testbg'>
                        {showanswer && <ShowAns questions={questions} />}
                        <div>
                            <button className='w-fit bg-notebg text-pcolor font-bold p-1 my-1.5 mx-1 rounded-lg drop-shadow-md hover:bg-pcolor hover:text-white' type="submit" onClick={() => {
                                history('/home')
                            }}>Back to Home</button>
                            <button className='w-fit bg-notebg text-pcolor font-bold p-1 my-1.5 mx-1 rounded-lg drop-shadow-md hover:bg-pcolor hover:text-white' type="submit" onClick={() => {
                                history('/test')
                            }}>Back to Tests</button>
                        </div>
                    </div>
                    {notloggedtext && <div className='flex justify-center bg-testbg'>
                        <p className='text-red-500 text-center'>{notloggedtext}</p>
                        <Link className='font-semibold text-blue-500' to='/userprofile'> &nbsp; Login</Link>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ResultShow