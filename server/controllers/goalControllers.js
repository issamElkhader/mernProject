// import asyncHandler from "express-async-handler"
import { goalModel } from "../models/goalModel.js"
import { userModel } from "../models/userModel.js"
// @desc get Goals
// @route get /api/goals
// @access private
// export const getGoals = asyncHandler( async (req , res) => {
//     const goals = await goalModel.find({})
//     res.status(200).json(goals)
// })
export const getGoals =  async (req , res) => {
    await goalModel.find({user : req.user[0]._id})
        .then((result) => res.status(200).json(result))
        .catch((error) => res.status(400).json(error.message))
}
// @desc add Goals
// @route post /api/goals/:id
// @access private
export const setGoals =  async (req , res) => {
    if(!req.body.text) {
        res.status(400).json("Please add a text field")
    }else 
        await goalModel.findOne({"text" : req.body.text})
            .then(async (result) => {
                if(!result) {
                    await goalModel.create({
                        text : req.body.text ,
                        user : req.user[0]._id
                    })
                    .then((goal) => res.status(201).json(goal))
                    .catch((error) => res.status(400).json(error.message))
                }
                else res.status(400).json("goal already exists")
            })
            .catch((error) => res.status(400).json(error.message) )
}
// @desc update Goals
// @route put /api/goals/:id
// @access private
export const updateGoals =  async (req , res) => {
    if(!req.body.text) {
        res.status(400).json("please add all the fiels")
    }else 
        await userModel.findById(req.user[0]._id)
            .then(async (user) => {
                if(user) {
                    await goalModel.findOne({"_id" : req.params.id})
                        .then(async (goal) => {
                            if(goal !== null) {
                                if(goal.user.toString() !== user._id.toString()) {
                                    res.status(401).json("user not authorized")
                                }else {
                                    await goalModel.updateOne({"_id" : req.params.id} , {$set : {text : req.body.text}})
                                        .then(() => res.status(200).json("goal updated"))
                                        .catch((error) => res.status(400).json(error.message))
                                }
                            }else {
                                res.status(400).json("goal isnt exists")
                            }
                        })
                } else res.status(401).json("user not found")
            })
            .catch((error) => res.status(401).json(error.message))
}
// @desc delete Goals
// @route delete /api/goals/:id
// @access private
export const deleteGoals =  async (req , res) => {
    await userModel.findById(req.user[0]._id)
            .then(async (user) => {
                if(user) {
                    await goalModel.findOne({"_id" : req.params.id})
                        .then(async (goal) => {
                            if(goal !== null) {
                                if(goal.user.toString() !== user._id.toString()) {
                                    res.status(401).json("user not authorized")
                                }else {
                                    await goalModel.deleteOne({"_id" : req.params.id})
                                        .then(() => res.status(200).json(req.params.id))
                                        .catch((error) => res.status(400).json(error.message))
                                }
                            }else {
                                res.status(400).json("goal isnt exists")
                            }
                        })
                } else res.status(401).json("user not found")
            })
            .catch((error) => res.status(401).json(error.message))
}
