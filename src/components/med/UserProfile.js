import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLoggedIn } from './functions'
import Cookies from 'js-cookie';
import ROOT from '../Const';

import { SupraHeader } from './re-comp/Header'
import UserLogin from './UserLogin';

import { formatDate } from './functions';

import { loadlocalStorage, storelocalStorage } from './functions';

import LogoAnimation from './re-comp/LogoAnimation';

function UserProfile() {

    const history = useNavigate()
    const history2 = useNavigate()
    const [userinfo, setuserInfo] = useState({})
    const [usertests, setuserTests] = useState([])
    const [loggedin, setloggedIn] = useState(true)
    const [notloggedtest, setnotloggedText] = useState('')
    // const [showlogout, setshowLogout] = useState(false)

    const [showlogoanimation, setshowlogoAnimation] = useState(true)




    const doLogOut = async () => {

        setloggedIn(false)
        Cookies.remove('logintoken')
        const user_type = Cookies.get("usertype")
        // history2('/home', { state: { id: user_type } })
    }


    const renderuserProfile = async () => {
        // console.log('render user profile')

        const logintoken = Cookies.get("logintoken")

        // first check for login token
        // to know if logged in or not
        if (logintoken) {
            try {
                const res = await fetch(ROOT + '/userprofile', {
                    // mode: 'no-cors',
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        logintoken: logintoken, //sending login token from frontend to backend
                    })
                })

                const data = await res.json()
                setuserInfo(data.userdata)
                setuserTests(data.userdata.tests)

                storelocalStorage('userinfo',{
                    username:userinfo.username,
                    email:userinfo.email
                })

                setloggedIn(true)
                setshowlogoAnimation(false) //loading animation


                if (data.status == 401) {
                    setloggedIn(false)
                }

            } catch (error) {
                console.log('try catch error', error)
            }

        } else {
            setloggedIn(false)
        }


        // console.log('logintoken in profile', logintoken)


    }



    useEffect(() => {
        renderuserProfile()
    }, [loggedin])

    return (
        <div className='bg-testbg min-h-screen w-screen flex flex-col items-center'>
            <SupraHeader />
            {loggedin ? <>
                {showlogoanimation ? <LogoAnimation /> :<div className='w-full sm:min-h-full sm:w-4/5 lg:w-3/5 flex flex-col sm:flex-row '>
                    <div className='mb-10 sm:mb-0 sm:w-2/5 sm:h-full'>
                        <h4 className='pl-3 mb-3 font-bold text-xl border-b-2 border-pcolor'>PROFILE</h4>
                        <p><span className='pl-3 font-bold'>Name :</span> {userinfo.username}</p>
                        <p><span className='pl-3 font-bold'>Email :</span> {userinfo.email}</p>
                        <p><span className='pl-3 font-bold'>Date Joined :</span> {formatDate(userinfo.date)}</p>
                        {loggedin && <button className='ml-3 link-head mt-5 bg-navbg p-1 text-pcolor rounded-md hover:bg-pcolor hover:text-white' onClick={doLogOut}>logout</button>}
                    </div>
                    <div className=' sm:w-3/5 sm:border-l-2 sm:border-r-2 border-pcolor min-h-full '>
                        <h5 className='pl-2 mb-3 font-bold text-xl border-b-2 border-pcolor'>TESTS ATTENDED</h5>
                        {usertests.map((test, index) => {
                            return (<>
                                <p className='pl-2'><span className='font-bold text-lg capitalize'>{index + 1}. &nbsp; {test.testtitle}</span></p>
                                <p className='pl-2'><span className='font-bold'>Total Score :</span> {test.totalscore}</p>
                                <p className='pl-2'><span className='font-bold'>Time Taken :</span> {test.totaltimetaken}</p>
                                <p className='pl-2'><span className='font-bold'>Date :</span> {formatDate(test.date)}</p><br />
                            </>)
                        })}
                    </div>
                </div>} </> : <div className='flex flex-col justify-center'>
                <p className='text-red-600 font-bold my-10'>please log in to view your profile</p>
                <UserLogin renderuserProfile={renderuserProfile} />
            </div>}
        </div>
    )
}

export default UserProfile
