import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import SubTestTitleDisplay from './re-comp/SubTestTitleDisplay'
import ROOT from '../Const';
import Header, { SupraHeader } from './re-comp/Header'

import LogoAnimation from './re-comp/LogoAnimation';

function TestButtonList({ tests, categoryFilter, onClick }) {
  const filteredTests = tests.filter(test => test.category === categoryFilter)

  if (filteredTests.length === 0) {
    return null // Don't render anything if there are no tests for the category
  }

  return (
    <>
      {/* <h3 className='text-2xl text-pcolor capitalize ml-3 my-5 font-medium underline '>{categoryFilter}</h3> */}

      <div className='ml-3 flex flex-wrap items-center justify-center'>
        {filteredTests.map(test => (
          <button className='m-1 p-2 bg-notebg text-pcolor drop-shadow-md hover:bg-pcolor font-medium hover:text-white rounded-xl'
            key={test.testname}
            id={test.testname}
            type='submit'
            onClick={(e) => onClick(e, test)}
          >
            <p>{test.testtitle}</p>
            <p></p>

          </button>
        ))}
      </div>
    </>
  )
}

function Test() {

  const history = useNavigate()

  const [tests, setTests] = useState([])
  const [showloadanimation, setshowloadAnimation] = useState(true)

  const [currentcategory, setcurrentCategory] = useState('dailytest')

  // TO GET CATEGORY WISE OBJECTS OF TEST
  function filterByCategory(objects, category) {
    return objects.filter(object => object.category === category);
  }

  const getAllTest = async () => {
    try {
      const res = await fetch(ROOT + '/getnewtest', {
        method: 'GET',
        headers: {
          // because there is cookies
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      setTests(data)
      setshowloadAnimation(false)

      // console.log(data)
    } catch (error) {
      console.error('Error fetching tests:', error);
    }
  }



  const CollectUserData = (e, selectedtest) => {
    e.preventDefault()
    // passing the current Test object to next page
    history(`/test/${selectedtest.testname}`, { state: { typeoftest: selectedtest } })
  }

  


  useEffect(() => {
    getAllTest()
  }, [])


  return (<>
    {showloadanimation ? <><LogoAnimation /></> :
      <div className='min-h-screen w-screen bg-testbg text-white'>
        <SupraHeader />
        <Header />
        {/* BUTTONS */}
        <div className='w-full h-full'>
          <div>
            <div className='w-full h-fit my-5 flex flex-wrap items-center justify-center rounded-lg drop-shadow-md'>
              <button id='modeltest' onClick={(e) => setcurrentCategory(e.currentTarget.id)} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 text-pcolor hover:bg-pcolor hover:text-white drop-shadow-md'>Model Tests</button>
              <button id='dailytest' onClick={(e) => setcurrentCategory(e.currentTarget.id)} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 text-pcolor hover:bg-pcolor hover:text-white drop-shadow-md'>Daily Tests</button>
              <button id='weeklytest' onClick={(e) => setcurrentCategory(e.currentTarget.id)} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 text-pcolor hover:bg-pcolor hover:text-white drop-shadow-md'>Weekly Tests</button>
              <button id='premiumtest' onClick={(e) => setcurrentCategory(e.currentTarget.id)} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 text-pcolor hover:bg-pcolor hover:text-white drop-shadow-md'>Premium Tests</button>
              <button id='chapwise' onClick={(e) => setcurrentCategory(e.currentTarget.id)} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 text-pcolor hover:bg-pcolor hover:text-white drop-shadow-md'>Chapter-wise Tests </button>
              <button id='paidpartnership' onClick={(e) => setcurrentCategory(e.currentTarget.id)} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 text-pcolor hover:bg-pcolor hover:text-white drop-shadow-md'>Paid-partnership Tests</button>
            </div>
          </div>
          <div className='w-full flex justify-center'>
            {currentcategory === 'modeltest' && <div className='flex p-3 flex-col flex-wrap justify-center items-center mx-0  w-full sm:w-4/5'>
              <p className='text-pcolor w-full lg:w-2/3 my-10'><b>Model test</b> offers you a pre-determined set of questions with fixed number of questions from each subjects and a fixed time to attend the test. The result won't be shown in aggregate as rank-wise however you can view your result after submitting the test. These tests can be attended as many times as you can with different sets of questions each time.
                You can customize the questions also by clicking the <b>CUSTOM MODEL TEST</b>.</p>
              <TestButtonList tests={tests} categoryFilter='modeltest' onClick={CollectUserData} />

            </div>}
            {currentcategory === 'chapwise' && <div className='flex p-3 px-0 flex-col flex-wrap justify-center items-center mx-0  w-full sm:w-4/5'>
              <p className='text-pcolor w-full lg:w-2/3 my-10'><b>Chapter Wise Test</b> offers you a pre-determined set of questions with fixed number of questions from a given chapter & a fixed time to attend the test. The result won't be shown in aggregate as rank-wise however you can view your result after submitting the test. These tests can be attended as many times as you can with different sets of questions each time.
                You can customize the questions also by clicking the <b>CUSTOM CHAPTER-WISE TEST</b>.</p>
            </div>}
            {currentcategory === 'dailytest' && <div className='flex p-3 flex-col flex-wrap justify-center items-center mx-0  w-full sm:w-4/5'>
              <p className='text-pcolor w-full lg:w-2/3 my-10'><b>Daily test</b> offers you a pre-determined set of questions with fixed number of questions as a model test. This is a live test in which the students can join at a fixed time and the test will be active for a given fixed duration after which the test can't be attended. The test result will be published in aggregate as a <b>RANK-WISE result</b> after the test is expired.
                However the test will be <b>Repeated</b> everyday at the same time for the same duration</p>

              <TestButtonList tests={tests} categoryFilter='dailytest' onClick={CollectUserData} />
            </div>}
            {currentcategory === 'weeklytest' && <div className='flex p-3 flex-col flex-wrap justify-center items-center mx-0  w-full sm:w-4/5'>
              <p className='text-pcolor w-full lg:w-2/3 my-10'><b>Weekly test</b> offers you a pre-determined set of questions with fixed number of questions as a model test. This is a live test in which the students can join at a fixed time and the test will be active for a given fixed duration after which the test can't be attended. The test result will be published in aggregate as a <b>RANK-WISE result</b> after the test is expired.
                However the test will be <b>Repeated</b> everyweek at the same time for the same duration</p>
              <TestButtonList tests={tests} categoryFilter='weeklytest' onClick={CollectUserData} />
            </div>}
            {currentcategory === 'premiumtest' && <div className='flex p-3 flex-col flex-wrap justify-center items-center mx-0  w-full sm:w-4/5'>
              <p className='text-pcolor w-full lg:w-2/3 my-10'><b>Premium test</b> offers you tests which are pre-fixed with fixed number
                of questions and duration. The difference here is that  <b>SOLUTIONS WILL BE PROVIDED</b> for the the qustions after submitting the questions.
                This is for <b>Premium users</b> only</p>

            </div>}
            {currentcategory === 'paidpartnership' && <div className='flex p-3 flex-col flex-wrap justify-center items-center mx-0  w-full sm:w-4/5'>
              <p className='text-pcolor w-full lg:w-2/3 my-10'><b>Paid Partnership test</b> offers you tests which are organized by different people / organization in a partnership with Medlocus.</p>

            </div>}
          </div>

          {/* <TestButtonList tests={tests} categoryFilter='archive' onClick={showResult} /> */}
        </div>
        </div>}</>
  )
}

export default Test
