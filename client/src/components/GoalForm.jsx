import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { addGoal } from '../features/goal/goalSlice'

const GoalForm = () => {
  const dispatch = useDispatch()
  const [formData , setFormData] = useState({
    input : ""
  })
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState ,
      [e.target.name] : e.target.value
    }))
  }
  const onSubmit = (e) => {
    e.preventDefault() ;
    dispatch(addGoal({
      text : formData.input
    }))
    formData.input = ""
  }
  return (
    <section className='form'>
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label htmlFor='text'>Goal</label>
        <input
          type='text'
          name='input'
          id='text'
          value={formData.input}
          onChange={onChange}
        />
      </div>
      <div className='form-group'>
        <button className='btn btn-block' type='submit'>
          Add Goal
        </button>
      </div>
    </form>
  </section>
  )
}

export default GoalForm