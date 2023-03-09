import React, { useState } from 'react'
import { SupraHeader } from './re-comp/Header'

import ROOT from '../Const'
import { place } from 'random-name'

function AdminPanel() {

    const [showsection, setshowSection] = useState('')

    // QUESTIONS //

    const [image, setImg] = useState({})
    const [question, setQuestion] = useState({
        qn: '', a: '', b: '', c: '', d: '', ans: '', category: ''
    })

    let name, value
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;

        setQuestion({ ...question, [name]: value })
    }

    const renderInput = (name, onchange, value, placeholder) => {

        console.log(placeholder)
        return (
            <input
                type="text"
                name={name}
                onChange={onchange}
                value={value}
                placeholder={placeholder}
            />
        )
    }

    const fileChange = (event) => {
        setImg(event.currentTarget.files[0]) //files are always in ARRAY format
    }

    const sendQuestions = async (e) => {
        // to prevent reloading of the page
        e.preventDefault()

        const { qn, a, b, c, d, ans, category } = question;
        if (category === 'm') {

            console.log('mat category')

            let formData = new FormData()
            formData.append('avatar', image)
            formData.append('qn', qn)
            formData.append('a', a)
            formData.append('b', b)
            formData.append('c', c)
            formData.append('d', d)
            formData.append('ans', ans)
            // formData.append('imgname', imgname)

            // console.log(formData)
            const res = await fetch(ROOT + '/saveimage', {
                method: "POST",
                body: formData
            })

            const data = await res.json()
            if (data.status === 422 || !data) {
                console.log('invalid')
            } else {
                console.log('success image sent to server')
                // setImg({})
            }

        } else {

            console.log('non mat category')
            const res = await fetch(ROOT + '/addquestion', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // since database stores only string form
                body: JSON.stringify({
                    qn, a, b, c, d, ans, category
                })
            })

            const data = await res.json()
            console.log('after send')
            console.log(data)

            if (data.status === 422 || !data) {
                console.log('invalid')
            } else {
                console.log('success')

                // history('/quiz')

            }

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
                {(showsection === 'aq') && <div className='bg-pcolor'>


                    <form action="" method="post">
                        <h4>add question</h4>

                        {renderInput("qn", handleInput, question.qn, "qn")}
                        {renderInput("a", handleInput, question.a, "a")}
                        {renderInput("b", handleInput, question.b, "b")}
                        {renderInput("c", handleInput, question.c, "c")}
                        {renderInput("d", handleInput, question.d, "d")}
                        {renderInput("ans", handleInput, question.ans, "ans")}
                        <div>
                            <input type="radio" id="huey" name="category" value="p" onChange={handleInput} />
                            <label for="huey">Physics</label>
                        </div>

                        <div>
                            <input type="radio" id="dewey" name="category" value="c" onChange={handleInput} />
                            <label for="dewey">Chemistry</label>
                        </div>

                        <div>
                            <input type="radio" id="louie" name="category" value="b" onChange={handleInput} />
                            <label for="louie">Biology</label>
                        </div>

                        <div>
                            <input type="radio" id="louie" name="category" value="m" onChange={handleInput} />
                            <label for="louie">Mat</label>
                        </div>
                        <h4>add images to server</h4>
                        {/* <input type="text" name="imgname" id="" onChange={(e) => setimgName(e.currentTarget.value)} /> */}
                        <input type="file" name="avatar" id="" onChange={fileChange} />
                        {/* <button type="submit" onClick={sendFile}>send photo</button> */}

                        <button onClick={sendQuestions} type="submit">submit</button>
                    </form>

                    
                </div>}

                {/* TESTS */}
                {(showsection === 'addtest') && <div>ADD tests</div>}

                {/* NOTES */}
                {(showsection === 'addnote') && <div>ADD m=notes</div>}

                {/* STATUS */}
                {(showsection === 'viewstatus') && <div>status</div>}
            </div>
        </div>
    )
}

export default AdminPanel
