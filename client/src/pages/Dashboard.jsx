import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import GoalForm from '../components/GoalForm'
import { getGoals, reset } from '../features/goal/goalSlice'
import {toast} from "react-toastify"
import Spinner from "../components/Spinner"
import GoalItem from '../components/GoalItem'
const Dashboard = () => {
  const {user} = useSelector(state => state.auth)
  const {isLoading  , isError , message , goals} = useSelector(state => state.goal)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  if(isLoading) {
    return <Spinner />
  }
  return (
    <>
    <section className='heading'>
        <h1>Welcome <span style={{"textDecoration" : "underline black"}}>{user && user.name}</span></h1>
        <p>Goals Dashboard</p>
      </section>

      <section className='content'>
        <GoalForm />
        {goals.length !== 0 ? goals.map((goal) => (
          <GoalItem goal = {goal} key={goal._id}/>
        )) : "you dont have any goal yet !"}
      </section>
    </>
  )
}

export default Dashboard