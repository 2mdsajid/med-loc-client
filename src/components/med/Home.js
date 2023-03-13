import React, { useEffect, useState } from 'react'
import { websiteMode } from '../Testtype'
import Header, { SupraHeader } from './re-comp/Header';
import Footer from './re-comp/Footer';
import AboutUs from './re-comp/AboutUs';

import Nav from './re-comp/Header'
// import { userType } from '../Testtype';

import { useLocation, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import ROOT from '../Const';


let user_type = null; // initializing as null to avoid undefined error



function Home() {

  // defining a conditional variable
  // const [isTrue, setIsTrue] = useState(false);


  const location = useLocation();
  // const user_type = location.state.id;
  const user_type = Cookies.get("usertype")

  // STORING THE USER TYPE IN THE COOKIES FOR WHOLE APP USE
  //  Cookies.set('usertype',user_type , { expires: 99 });

  // LOADING THE STORED COOKIES FORUSER TYPE
  // const user_type = Cookies.get('usertype');


  useEffect(() => {
    // setIsTrue(!isTrue);


    // const addVisitors = async () => {
    //   try {

    //     const res = await fetch(ROOT + '/addvisitors', {
    //       // mode: 'no-cors',
    //       method: 'GET',
    //       headers: {
    //         "Content-Type": "application/json"
    //       }
    //     })

    //     const data = await res.json()
    //     console.log(data.message)

    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // addVisitors()


  }, []);


  //     
  //     
  //   <div className="min-h-screen w-screen bg-pcolor border flex flex-col justify-between">
  //   <SupraHeader user_type={user_type} />
  {/* <Header />
<AboutUs />
<Footer /> */}
  // </div>

  return (

    <div className='bg-pcolor min-h-screen w-screen'>
      <SupraHeader />
      <div className='h-screen flex flex-col justify-between items-center'>
        <Header />
        <AboutUs />
        <Footer />
      </div>
    </div>


  )
}

export default Home
// export {user_type}
