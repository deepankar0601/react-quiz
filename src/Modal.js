import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const {showModal,isModalOpen,closeModal,correct,questions} = useGlobalContext()
  return <div className={`${showModal ?
  'modal-container isOpen' : 'modal-container'}`}>
    <div className='modal-content'>
      <h2>congrats!</h2>
      <p>You answered {((correct/questions.length)* 100)}% 
      of questions correctly
      </p>
      <button className='close-btn' onClick={closeModal}>play again</button>
    </div>
  </div>
}

export default Modal
