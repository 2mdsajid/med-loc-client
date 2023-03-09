import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import SubTestTitleDisplay from './re-comp/SubTestTitleDisplay'
import ROOT from '../Const';
import Header,{SupraHeader} from './re-comp/Header'

import LogoAnimation from './re-comp/LogoAnimation';

function TestButtonList({ tests, categoryFilter, onClick }) {
  const filteredTests = tests.filter(test => test.category === categoryFilter)

  if (filteredTests.length === 0) {
    return null // Don't render anything if there are no tests for the category
  }

  return (
    <>
      <h3 className='text-2xl text-pcolor capitalize ml-3 my-5 font-medium underline '>{categoryFilter}</h3>
      <div className='ml-3'>
      {filteredTests.map(test => (
        <button className='m-1 p-2 bg-notebg text-pcolor drop-shadow-md hover:bg-pcolor font-medium hover:text-white rounded-xl'
          key={test.testname}
          id={test.testname}
          type='submit'
          onClick={(e) => onClick(e, test)}
        >
          {test.testtitle}
        </button>
      ))}
      </div>
    </>
  )
}

function Test() {

  const history = useNavigate()

  const [tests, setTests] = useState([])
  const [showloadanimation,setshowloadAnimation] = useState(true)

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

  const showResult = (e, selectedtest) => {
    e.preventDefault()
    history(`/test/result/${selectedtest.testname}`, { state: { typeoftest: selectedtest } })
  }


  useEffect(() => {
    getAllTest()
  }, [])


  return (<>
    {showloadanimation ? <><LogoAnimation /></> : <div className='h-screen bg-testbg text-white'>
    <SupraHeader />
      <TestButtonList tests={tests} categoryFilter='modeltest' onClick={CollectUserData} />
      <TestButtonList tests={tests} categoryFilter='dailytest' onClick={CollectUserData} />
      <TestButtonList tests={tests} categoryFilter='weeklytest' onClick={CollectUserData} />
      <TestButtonList tests={tests} categoryFilter='archive' onClick={showResult} />
    </div>}</>
  )
}

export default Test
