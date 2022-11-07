import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {waiting,loading,questions,index,correct,nextQuestion,correctAnswer} = useGlobalContext();
  if(waiting){
    return  <SetupForm/>
  }
  if(loading){
    return <Loading/>
  }
  const {question,incorrect_answers,correct_answer} = questions[index]
  let answers =[...incorrect_answers]
  const randNum = Math.floor(Math.random() * 4) + 1
  answers.splice(randNum,0,correct_answer)
  console.log(correct_answer)
  return (
   <> <Modal/>
    <section className='quiz'>
         <p className='correct-answers'>Correct answer: {correct}/{index}</p>
         <article className='container'>
          <h2 dangerouslySetInnerHTML={{__html:question}}/>
          <div className='btn-container'>
            {
              answers.map((answer,index)=>{
               return  <button className='answer-btn' dangerouslySetInnerHTML={{__html:answer}} key={index} onClick={()=>correctAnswer(answer)}/>
              })
            }
          </div>
         </article>
         <button className='next-question' onClick={nextQuestion}>Next Question</button>
    </section>
    </>
  )
}

export default App
