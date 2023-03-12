import React, { useEffect, useState } from 'react'
// import LogoAnimation from './re-comp/LogoAnimation'
import { SupraHeader } from './re-comp/Header'

import LogoAnimation from './re-comp/LogoAnimation'

import ROOT from '../Const'
import { useNavigate } from 'react-router-dom'

import { formatDate } from './functions'
import Header from './re-comp/Header'

function ArchiveTests() {

    const history = useNavigate()

    const [archivetests, setarchiveTests] = useState([])
    const [showloadanimation, setshowloadAnimation] = useState(true)

    const showResult = (e, selectedtest) => {
        e.preventDefault()
        history(`/results/${selectedtest.testname}`, { state: { typeoftest: selectedtest } })
    }

    const getAllTest = async () => {
        try {
            const res = await fetch(ROOT + '/getarchivetest', {
                method: 'GET',
                headers: {
                    // because there is cookies
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json()

            if (data.status === 200) {
                setarchiveTests(data.tests)
                setshowloadAnimation(false)
            }

            console.log(data.message)

            // console.log(data)
        } catch (error) {
            console.error('Error in trycatch', error);
        }
    }


    useEffect(() => {

        getAllTest()

    }, [])


    return (<>
        {showloadanimation ? <LogoAnimation /> : <div className='bg-testbg w-screen min-h-screen'>
            <SupraHeader />
            <Header />
            <div className='w-screen h-full'>
                <div className='w-full sm:w-3/5 mx-auto mt-10 p-5 flex flex-wrap flex-col items-center justify-center'>
                    <p className='text-lg font-bold my-5'>Select the test to view the rank-wise result</p>
                    <div>
                        {archivetests.map((test) => {
                            return (<button className='m-1 p-2 bg-notebg text-pcolor drop-shadow-md hover:bg-pcolor hover:text-white rounded-xl'
                                key={test.testname}
                                id={test.testname}
                                type='submit'
                                onClick={(e) => showResult(e, test)}>
                                <p className='text-lg font-semibold'>{test.testtitle}</p>
                                <p >{formatDate(test.date)}</p>
                            </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>}
        </>
    )
}

export default ArchiveTests
