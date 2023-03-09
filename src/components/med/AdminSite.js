import React, { useState } from 'react'
import ROOT from '../Const'
import { SupraHeader } from './re-comp/Header'

// import ROOT from '../Const'

function AdminSite() {

    const [showsection, setshowSection] = useState('addtest')
    const [successmessage, setsuccessMessage] = useState('')
    const [failedmessage, setfailedmessage] = useState('')


    // const responseMessage = (msg) = 

    // QUESTIONS-----------------------------
    const [qnimg, setqnImg] = useState({})
    const [imagetype, setimageType] = useState(false)
    const [question, setQuestion] = useState({
        qn: '', a: '', b: '', c: '', d: '', ans: '', chap: '', category: ''
    })

    let name, value
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        console.log(value)

        setQuestion({ ...question, [name]: value })
    }

    const renderInput = (name, onchange, value, placeholder) => {

        // console.log(placeholder)
        return (
            <input className='w-full my-2 px-2 py-1 rounded-md drop-shadow-md outline-none'
                type="text"
                name={name}
                onChange={onchange}
                value={value}
                placeholder={placeholder}
            />
        )
    }

    const fileChange = (event) => {
        setqnImg(event.currentTarget.files[0]) //files are always in ARRAY format
        setimageType(true)
        console.log(qnimg)
    }

    const sendQuestions = async (e) => {
        // to prevent reloading of the page
        e.preventDefault()

        const { qn, a, b, c, d, ans, chap, category } = question;


        if (imagetype) {

            let formData = new FormData()
            formData.append('avatar', qnimg)
            formData.append('qn', qn)
            formData.append('a', a)
            formData.append('b', b)
            formData.append('c', c)
            formData.append('d', d)
            formData.append('ans', ans)
            formData.append('chap', chap)
            formData.append('category', category)

            const res = await fetch(ROOT + '/addqnwithimage', {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            if (data.status === 400 || !data) {
                console.log(data.message)
            } else {
                console.log(data.message)
            }

        } else {


            const res = await fetch(ROOT + '/addquestion', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // since database stores only string form
                body: JSON.stringify({
                    qn, a, b, c, d, ans, chap, category
                })
            })

            const data = await res.json()

            if (data.status === 400 || !data) {
                console.log(data.message)
            } else {
                console.log(data.message)
            }

        }





    }

    // TEST------------------------------------------
    // { testtitle, testname, physics, chemistry, biology, mat, time, category }

    const [test, setTest] = useState({
        testtitle: '', testname: '', physics: '', chemistry: '', biology: '', mat: '', type: '', value: '', duration: '', repeatafter: '', category: ''
    })

    const handletestInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        console.log(value)

        setTest({ ...test, [name]: value })
    }

    const addNote = async (e) => {
        e.preventDefault()

        const newtest = {

            testtitle: test.testtitle,
            testname: test.testname,
            physics: test.physics,
            chemistry: test.physics,
            biology: test.biology,
            mat: test.mat,
            time: {
                mat: test.mat,
                type: test.type,
                value: test.value,
                duration: test.duration,
                repeatafter: test.repeatafter
            },
            category: test.category
        }

        try {

            const res = await fetch(ROOT + '/addnewtest', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // since database stores only string form
                body: JSON.stringify(newtest)
            })

            const data = await res.json()

            if (data.status === 400 || !data) {
                console.log(data.message)
            } else {
                console.log(data.message)
            }

        } catch (error) {

        }

    }



    // NOTES--------------------------------------

    const [noteimg, setnoteImg] = useState([])
    const [notetitle, setnoteTitle] = useState('')
    const [noteimgname, setnoteimgName] = useState('')
    const [notecontent, setnoteContent] = useState('')
    const [noteintro, setnoteIntro] = useState('')
    const [notecategory, setnoteCategory] = useState('')

    const handlenoteImage = (e) => {
        const image = e.currentTarget.files
        setnoteImg([...image])

    }

    const handlenoteCategory = (e) => {
        setnoteCategory(e.currentTarget.value)
        console.log(notecategory)
    }

    const sendNotePhotos = async (event) => {
        event.preventDefault()

        let formData = new FormData()

        for (let i = 0; i < noteimg.length; i++) {
            formData.append(`note`, noteimg[i])
        }

        formData.append('notetitle', notetitle)
        formData.append('noteimgname', noteimgname)
        formData.append('notecontent', notecontent)
        formData.append('noteintro', noteintro)
        formData.append('notecategory', notecategory)

        console.log(formData)

        const res = await fetch(ROOT + '/savenote', {
            method: "POST",
            body: formData
        })

        const data = await res.json()

        console.log('res', data.content)
        if (data.status === 422 || !data) {
            console.log('invalid')
        } else {
            console.log('success image sent to server')
        }
    }


    return (
        <div className='w-screen min-h-screen bg-testbg'>
            <SupraHeader />
            <div className='w-full h-full'>
                {/* BUTTONS */}
                <div className=' w-full max-h flex flex-wrap p-2 items-center justify-center'>
                    <button id='aq' onClick={(e) => setshowSection(e.currentTarget.id)} className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>Add questions</button>
                    <button id='addtest' onClick={(e) => setshowSection(e.currentTarget.id)} className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>Add New Test</button>
                    <button id='addnote' onClick={(e) => setshowSection(e.currentTarget.id)} className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>Add notes</button>
                    <button id='viewstatus' onClick={(e) => setshowSection(e.currentTarget.id)} className=' p-1 m-1 rounded-lg bg-cyan-300 drop-shadow-md hover:bg-pcolor hover:text-white'>View Status</button>
                </div>

                {/* SECTIONS */}

                {/* QUESTIONS */}
                {(showsection === 'aq') && <div className='w-full max-h border border-pcolor p-2'>

                    <form className='mx-auto w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col items-center' action="" method="post">
                        <h4 className='font-bold my-5 text-xl '>Add Question</h4>

                        {renderInput("qn", handleInput, question.qn, "question")}
                        {renderInput("a", handleInput, question.a, "option a")}
                        {renderInput("b", handleInput, question.b, "option b")}
                        {renderInput("c", handleInput, question.c, "option c")}
                        {renderInput("d", handleInput, question.d, "option d")}
                        {renderInput("ans", handleInput, question.ans, "answer (a b c d) ")}
                        {renderInput("chap", handleInput, question.chap, "chapter name")}

                        <div className='w-full my-3'>
                            {['Physics', 'Chemistry', 'Biology', 'Mat'].map((item, index) => (
                                <div className='flex items-center justify' key={index}>
                                    <input className='ml-3 w-5 h-5 cursor-pointer' type="radio" id={item} name="category" value={item.charAt(0).toLowerCase()} onChange={handleInput} />
                                    <label className='ml-2 text-lg font-semibold' htmlFor={item}>{item}</label>
                                </div>
                            ))}
                        </div>

                        <div className='w-full'>
                            <h4 className='my-3 font-semibold text-lg'>Add Image (if any )</h4>
                            {/* <input type="text" name="imgname" id="" onChange={(e) => setimgName(e.currentTarget.value)} /> */}
                            <input type="file" name="avatar" id="" onChange={fileChange} />
                            {/* <button type="submit" onClick={sendFile}>send photo</button> */}
                        </div>
                        <button className='my-5 p-1 w-32 rounded-lg bg-notebg font-bold  drop-shadow-md hover:bg-pcolor hover:text-white' onClick={sendQuestions} type="submit">submit</button>
                    </form>

                </div>}

                {/* TESTS */}
                {(showsection === 'addtest') && <div>

                    {/* testtitle: '', testname: '', physics: '', chemistry: '', biology: '', mat: '', type: '', value: '', duration: '', repeatafter: '', category: '' */}
                    <form className='mx-auto w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col items-center' onSubmit={addNote}>
                        <h4 className='font-bold my-5 text-xl '>Add New Test</h4>
                        {renderInput("testtitle", handletestInput, test.testtitle, "Title")}
                        {renderInput("testname", handletestInput, test.testname, "Test Code")}
                        {renderInput("physics", handletestInput, test.physics, "Physics")}
                        {renderInput("chemistry", handletestInput, test.chemistry, "chemistry")}
                        {renderInput("biology", handletestInput, test.biology, "biology")}
                        {renderInput("mat", handletestInput, test.mat, "mat")}
                        <p className='font-bold text-lg'>Time</p>
                        {renderInput("type", handletestInput, test.type, "type - timed/free")}
                        {renderInput("value", handletestInput, test.value, "value - in hour")}
                        {renderInput("duration", handletestInput, test.duration, "duration - in minutes")}
                        {renderInput("repeatafter", handletestInput, test.repeatafter, "repeatafter - put '1'")}
                        {renderInput("category", handletestInput, test.category, "category (modeltest / chapterwise) ")}
                        <input className='my-5 p-1 w-32 rounded-lg bg-notebg font-bold  drop-shadow-md hover:bg-pcolor hover:text-white' type="submit" />
                    </form>
                </div>}

                {/* NOTES */}
                {(showsection === 'addnote') && <div className='w-full max-h border border-pcolor p-2'>

                    <p className='mx-auto w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 font-semibold'>
                        Instructions to add a note:<hr className='border-pcolor' /><br />
                        1. Add 1:2 images as far as possible<br />
                        2. Put a short (20-30 words) intro in the intro section<br />
                        3. Add HTML tags wherever needed<br />
                        {'<b>--> Bold'}<br />
                        {'<i>--> Italic'}<br />
                        {'<u>--> Underline'}<br />
                        {'<br>-> New line'}<br />
                        4. Add 1:2 ratio images as far as possible<br />
                        5. Put a name of image (unique and not used previously) and without space<br />
                        6. use this tag for inserting images into documents:<br />
                        {'<br /><img src="_root_imgname1.jpeg" alt="" /><br />'}<br />
                        7. imgname == name of image, 1=1st image, 2=2nd image<br />
                    </p>
                    <form className='mx-auto mt-3 w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 flex flex-col items-center' action="">
                        <input className='w-full my-2 px-2 py-1 rounded-md drop-shadow-md outline-none' type="text" name="notetitle" placeholder='title of note' id=""
                            onChange={(e) => setnoteTitle(e.currentTarget.value)}
                        />
                        <input className='w-full my-2 px-2 py-1 rounded-md drop-shadow-md outline-none' type="text" name="noteimagename" placeholder='name of image' id=""
                            onChange={(e) => setnoteimgName(e.currentTarget.value)}
                        />
                        <textarea className='w-full my-2 px-2 py-1 rounded-md drop-shadow-md outline-none' name="noteintro" id="" cols="30" rows="5"
                            onChange={(e) => setnoteIntro(e.currentTarget.value)} placeholder='Intro'></textarea>

                        <textarea className='w-full my-2 px-2 py-1 rounded-md drop-shadow-md outline-none' name="notecontent" id="" cols="30" rows="10"
                            onChange={(e) => setnoteContent(e.currentTarget.value)} placeholder='Content'></textarea>

                        <input className='w-full my-2 px-0 py-1 rounded-md drop-shadow-md outline-none' type="file" multiple name='noteimg' placeholder='content'
                            onChange={handlenoteImage}
                        />
                        {/* <h1></h1> */}

                        <div className='w-full my-3'>
                            {['Physics', 'Chemistry', 'Biology', 'Mat'].map((item, index) => (
                                <div className='flex items-center justify' key={index}>
                                    <input className='ml-3 w-5 h-5 cursor-pointer' type="radio" id={item} name="category" value={item.charAt(0).toLowerCase()} onChange={handlenoteCategory} />
                                    <label className='ml-2 text-lg font-semibold' htmlFor={item}>{item}</label>
                                </div>
                            ))}
                        </div>
                        <button className='my-5 p-1 w-32 rounded-lg bg-notebg font-bold  drop-shadow-md hover:bg-pcolor hover:text-white' type='submit' onClick={sendNotePhotos}>send photos</button>
                    </form>
                </div>}

                {/* STATUS */}
                {(showsection === 'viewstatus') && <div>status</div>}
            </div>
        </div>
    )
}

export default AdminSite
