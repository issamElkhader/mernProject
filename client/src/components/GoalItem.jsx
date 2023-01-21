import { useDispatch } from 'react-redux'
import { deleteGoal } from '../features/goal/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const deleteGoalFunc = (id) => {
        dispatch(deleteGoal(id))
  }
  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      <h2>{goal.text}</h2>
      <button className='close' onClick={() => deleteGoalFunc(goal._id)}>
        X
      </button>
    </div>
  )
}

export default GoalItem