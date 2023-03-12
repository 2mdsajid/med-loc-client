import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';
import { useNavigate } from 'react-router-dom';

import { SupraHeader } from './re-comp/Header'
import Header from './re-comp/Header';

import ROOT from '../Const';

const ParsedElement = (props) => {
  const root = props.root
  let str = props.string
  // g = all occurance
  const newstr = str.replace(/_root_/g, root)
  const parsedHtml = parse(newstr)
  return parsedHtml

};

// function ParsedElement(html, imageUrlPrefix) {
//   const parsedHtml = parse(html.replace(/{note\.rooturl\+([^"]+)}/g, (match, imageName) => imageUrlPrefix + imageName));
//   return parsedHtml;
// }


function Notes() {
  const history = useNavigate()

  const [notes, setNotes] = useState([]); //to store notes
  const [currentnotes, setcurrentNotes] = useState('p')


  const loadNotes = async () => {

    try {
      const res = await fetch(ROOT + '/getnotes', {
        method: 'GET',
        headers: {
          // because there is cookies
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      setNotes(data)
      // console.log(notes)


    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  }

  const setCurrentNotes = (e) =>{
    e.preventDefault()
    setcurrentNotes(e.currentTarget.id)
  }

  const directSingleNote = (note) => {
    history(`/note/${note.imgname}`, { state: { note } })
  }



  // to load notes on loading the pages
  useEffect(() => {
    // fetch data from an API
    loadNotes()
  }, []);


  // {notes.map((note, index) => {
  //           {/* console.log(note.notecontent) */ }
  //           return (<>
  //             <button onClick={() => directSingleNote(note)}>{index} : {note.title}</button>
  //             {/* <div className='notecontent'><ParsedElement string={note.notecontent} root={note.rooturl} /></div> */}
  //           </>)
  //         })}


  return (
    <div className='min-h-screen w-screen bg-testbg'>
      <SupraHeader />
      <Header />
      <div className='w-full h-full px-5 '>
    {/* NOTES VS CONFUSING TERS */}

      {/* CATEGORIES........... */}
        <div className='w-full h-fit my-5 flex flex-wrap items-center justify-center rounded-lg drop-shadow-md'>
          <button id='p' onClick={setCurrentNotes} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 hover:bg-pcolor hover:text-white drop-shadow-md'>Chemistry </button>
          <button id='c' onClick={setCurrentNotes} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 hover:bg-pcolor hover:text-white drop-shadow-md'>Physics </button>
          <button id='b' onClick={setCurrentNotes} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 hover:bg-pcolor hover:text-white drop-shadow-md'>Biology </button>
          <button id='m' onClick={setCurrentNotes} className='p-2 m-2 text-lg font-semibold rounded-xl bg-blue-200 hover:bg-pcolor hover:text-white drop-shadow-md'>Mat </button>
        </div>

        {/* NOTES */}
        <div className='w-full flex flex-wrap justify-center'>
          {notes.map((note) => {
            if (note.category === currentnotes) {
              return (<div className=' p-3 sm:w-2/5 lg:w-1/5 xl:1/6 '>
                <p className='ml-1  mb-1 text-xl font-bold'>{note.title}</p>
                <div className='bg-notebg p-3 text-sm font-semibold rounded-lg'>
                  <p className=''>{note.intro}</p>
                  <button onClick={() => directSingleNote(note)} className='p-1.5 mt-5 bg-gray-300 rounded-lg text- drop-shadow-md hover:bg-pcolor hover:text-white'>Read More</button></div>
              </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )

}

export default Notes
export { ParsedElement }
