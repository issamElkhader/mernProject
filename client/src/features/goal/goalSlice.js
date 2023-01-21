import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

// API url
const API_URL = "/api/goals"


const initialState = {
    goals : [] ,
    isError : false ,
    isSeccuss : false ,
    isLoading : false ,
    message :""
}

// get goals
export const getGoals = createAsyncThunk("goal/getGoals" , async (_ ,thunkAPI) => {
    try {
        const token =thunkAPI.getState().auth.user.token
        if(token)
            {
                const config = {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
                const response = await axios.get(`${API_URL}` , config)
                return response.data
            }
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data || error.message)
    }
})
// add a goal
export const addGoal = createAsyncThunk("goal/addGoal" , async (goal , thunkAPI) => {
    try {
        const token =thunkAPI.getState().auth.user.token
        if(token)
            {
                const config = {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                }
                const response = await axios.post(`${API_URL}` , goal  , config )
                return response.data
            }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
})
// delete a goal
export const deleteGoal = createAsyncThunk("goal/deleteGoal" , async (id , thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        if(token) {
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            const response = await axios.delete(`${API_URL}/${id}`,config)
            return response.data
        }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data || error.message)
    }
})
const goalSlice = createSlice({
    name : "goal" ,
    initialState : initialState ,
    reducers : {
        reset : (state) => {
            state.isError = false 
            state.isLoading = false
            state.message = "" 
            state.isSeccuss = false 
            state.goals = []
        }
    } ,
    extraReducers : (builder) => {
        builder.addCase(addGoal.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(addGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals.push(action.payload)
          })
          builder.addCase(addGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          builder.addCase(getGoals.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(getGoals.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = action.payload
          })
          builder.addCase(getGoals.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
          builder.addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
          })
          builder.addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter(
              (goal) => goal._id !== action.payload
            )
            state.message = "goal deleted"
          })
          builder.addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })
    }
})

export const {reset} = goalSlice.actions
export default goalSlice.reducer ;