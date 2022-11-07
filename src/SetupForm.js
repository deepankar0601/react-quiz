import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {
  const {handleChange,quiz,error,handleSubmit} = useGlobalContext()
  return <main><section className='quiz quiz-small'>
      <form className='setup-form'>
        <h2>setup quiz</h2>
       {/*amount*/}
       <div className='form-control'>
        <label htmlFor='amount'>number of questions</label>
        <input type='number' 
        name='amount' 
        id='amount'
        value={quiz.amount}
        onChange={handleChange}
        className='form-input'
        min={1}
        max={50}/>

      </div>
      {/*category*/}
      <div className='form-control'>
        <label htmlFor='category'>category</label>
        <select className='form-input'
        name ='category'
        id = 'category'
        value={quiz.category}
        onChange={handleChange}
        >
          <option value='sports'>sports</option>
          <option value='politics'>politics</option>
          <option value='history'>history</option>
        </select>
       </div>
       {/*Difficulty*/}
       <div className='form-control'>
        <label htmlFor='difficulty'>select difficulty</label>
        <select className='form-input'
        name ='difficulty'
        id = 'difficulty'
        value={quiz.difficulty}
        onChange={handleChange}
        >
          <option value='easy'>easy</option>
          <option value='medium'>meduim</option>
          <option value='hard'>hard</option>
        </select>
       </div>
       {
        error && (
          <p className='error'>
            cant generate questions, 
            please try different options
          </p>
        )
       }
       <button type='submit' onClick={handleSubmit}
       className='submit-btn'>Start</button>
      </form>
    
    </section></main>

}

export default SetupForm
