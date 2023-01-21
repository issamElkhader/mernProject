import jwt from "jsonwebtoken" ;
import { userModel } from "../models/userModel.js";

export const protect = async (req , res , next) => {
    try {
        let token ;
        if(req.headers.authorization) {
            // headers.authorization => Bearer token
            // get the token from the header
            token = req.headers.authorization.split(" ")[1]
            // verify token
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            //  get user from the token
            await userModel.find({"_id" : decoded.id} , {"password" : 0})
                .then((result) => {
                    
                    req.user = result ;
                    next()
                })
                .catch(() => res.status(401).json("not authorized"))
        }
        if(!token) {
            res.status(401).json("not authorized  , no token ")
        }
    } catch (error) {
        res.status(401).json(error.message)
    }
}