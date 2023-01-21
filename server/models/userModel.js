import mongoose from "mongoose";

const userShema = mongoose.Schema(
    {
        name : {
            type : String ,
            required : [true , "please add a name"]
        } ,
        email : {
            type : String ,
            required : [true , "please add a email"] ,
            unique : [true , "email is already exists"]
        } ,
        password : {
            type :String ,
            required : [true , "please add a password"]
        }
    } ,
    {
        timestamps : true ,
        collection : "users"
    }
)

export const userModel = mongoose.model("users" , userShema)