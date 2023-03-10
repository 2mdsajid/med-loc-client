import React, { useState } from 'react'

import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

function ShowAns(props) {
    const [questions, setQuestions] = useState([])

    useState(() => {
        setQuestions(props.questions)
        // console.log(props.questions)
    }, [])

    const getQuestionClass = (uans) => {
        if (uans === 'nan'){
            return 'nil question'
        } else {
            return ''
        }
    }

    const getAnswerClass = (givenoption, useranswer, correctanswer) => {
        // checking if the selected option is either correct or user input
        if (givenoption === useranswer || givenoption === correctanswer) {
            // if given option is correct answer
            if (givenoption === correctanswer) {
                return 'correct '
            // if given option is user input and not correct
            } else if (givenoption === useranswer) {
                return 'incorrect '
            }
        } else {
            return ''
        }
        


    }

    return (
        <div className='anspage min-h-screen bg-testbg'>
            {
                questions.map((question, index) => {
                    return (<div className={getQuestionClass(question.uans)+' bg-testbg my-5'}>
                        <p className="qn ml-2 font-bold text-lg bg-testbg" id={question._id}><span className="qn-num">Q.{index + 1}. </span> {question.qn} </p>
                        {question.img && <img className='ml-2 text-lg font-semibold' style={{ height: '200px' }} src={question.img} alt="Question Image" />}
                        <p id={question.a} className={getAnswerClass('a', question.uans, question.ans)+' ml-2 text-lg font-semibold'}>a. {question.a}</p>
                        <p id={question.b} className={getAnswerClass('b', question.uans, question.ans)+' ml-2 text-lg font-semibold'}>b. {question.b}</p>
                        <p id={question.c} className={getAnswerClass('c', question.uans, question.ans)+' ml-2 text-lg font-semibold'}>c. {question.c}</p>
                        <p id={question.d} className={getAnswerClass('d', question.uans, question.ans)+' ml-2 text-lg font-semibold'}>d. {question.d}</p>
                    <div className='mb-3 mt-1 ml-2'>{question.uans === 'nan' && <p className='text-red-500 font-semibold'>Question Not Attempted</p>}</div>
                    </div>)
                })
            }
        </div>
    )
}

export default ShowAns
