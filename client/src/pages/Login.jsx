import React, { useState } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux' ;
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading , isSuccess , isError , user , message }  = useSelector(state => state.auth)
  const [formData , setFormData] = useState({
    email : "" ,
    password : ""
  })
  const {email , password} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState ,
      [e.target.name] : e.target.value
    }))
  }
  useEffect(() => {
    if(isError) toast.error(message)
    if(isSuccess || user ) {
      navigate("/")
    }
    dispatch(reset())
  }, [dispatch , navigate , isError , isSuccess , message ,user ])
  const onSubmit = (e) => {
    e.preventDefault()
    if(formData.email.trim().length === 0){
      return toast.error("email is required")
    }
    if(formData.password.trim().length === 0) {
      return toast.error("password is required")
    }
    dispatch(login({
      email : formData.email ,
      password : formData.password
    }))
  }
  if(isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and start setting goals</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              placeholder='Enter your email'
              onChange={onChange}
              value={email}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              placeholder='Enter password'
              onChange={onChange}
              value={password}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login