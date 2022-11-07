import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [ waiting,setWaiting ] = useState(true);// form fill up
  const [loading,setLoading] = useState(false);//for api call
  const [questions,setQuestions] = useState([])
  const [index,setIndex] = useState(0);//starting index of array of questions
  const [correct,setCorrect] = useState(0);//no of correct answers
  const [error,setError] = useState(false)
  const [showModal,setShowModal] = useState(false);
  const [quiz,setQuiz] = useState({
    amount:10,
    category:'sports',
    difficulty:'easy'
  })

  const fetchData = async (url)=>{
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch(err=>console.log(err))
    if(response){
      const data = response.data.results
      console.log(data)
      if(data.length> 0){
        setQuestions(data)
        setLoading(false);
        setWaiting(false);
        setError(false);
        
        console.log(questions)
      }else{
        setWaiting(true)
      }
    }
  }
  const nextQuestion = ()=>{
    setIndex(oldIndex =>{
      const newIndex = oldIndex + 1
      if(newIndex>questions.length-1){
        isModalOpen()
        return 0
      }else{
        return newIndex

      }
    })
  }
  const correctAnswer = (ans)=>{
     if(ans===questions[index].correct_answer){
      setCorrect(curr=> curr+1)
     }
     nextQuestion()
  }
  const isModalOpen = ()=>{
    setShowModal(true)
  }
  const closeModal =()=>{
    setShowModal(false)
    setWaiting(true)
  }
  const handleChange =(e)=>{
    const name =e.target.name;
    const value=e.target.value;

    setQuiz((curr)=>{
      return {...curr, [name] : value}
    })
    console.log(name,value)
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    fetchData(`https://opentdb.com/api.php?amount=${quiz.amount}&category=${table[quiz.category]}&difficulty=${quiz.difficulty}&type=multiple`)
  }
  return <AppContext.Provider value={{waiting,loading,
    questions,index,
    correct,error,
    showModal,nextQuestion,
    correctAnswer,isModalOpen,
    closeModal,showModal,quiz,handleChange,handleSubmit}}>
      {children}
    </AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
