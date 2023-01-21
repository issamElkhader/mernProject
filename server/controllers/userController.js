import {userModel} from "../models/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt" ;

// Generate  JWT 
const generateToken = (id) => {
    return jwt.sign({id} , process.env.JWT_SECRET , {
        expiresIn : "30d"
    })
}
// @desc add a new user
// @route post api/users/register
// @access Public
export const registerUser = async (req  , res) => {
    const {name , email , password} = req.body
    if(!name || !email || !password) {
        res.status(400).json("Please add all the fields")
    }else 
        await userModel.findOne({"email" : email})
        .then(async (result) => {
            if(result === null) {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password , salt)
                await userModel.create({
                    name : name ,
                    email : email ,
                    password : hashPassword
                })
                .then((result) =>res.status(201).json({
                        _id : result._id ,
                        name : result.name ,
                        email : result.email ,
                        token : generateToken(result._id)
                }))
                .catch((error) => res.status(400).json(error.message))
            }else res.status(400).json("user is already exists")
        })
        .catch((error) => res.status(400).json(error.message))
}
// @desc authentification 
// @route post api/users/login
// @access Public
export const loginUser = async (req  , res) => {
    const {email , password} = req.body ;
    if(!email || !password) {
        res.status(400).json("please add all the fields")
    } else {
        await userModel.findOne({"email" : email})
            .then(async (result) => {
                if(result !== null && (await bcrypt.compare(password , result.password))) {
                    res.status(200).json({
                            _id : result._id ,
                            name : result.name ,
                            email : result.email ,
                            token : generateToken(result._id)
                    })
                }else res.status(400).json("email or password are incorrect")
            })
            .catch((error) => res.status(400).json(error.message))
    }
}
// @desc get User data 
// @route get api/users/user?name=name
// @access Private
export const getUserData = async (req  , res) => {
    await userModel.findById(req.user[0]._id)
        .then((result) => {
            res.status(200).json({
                id : result._id ,
                name : result.name ,
                email : result.email
            })
        })
        .catch((error) => res.status(400).json(error.message))
}