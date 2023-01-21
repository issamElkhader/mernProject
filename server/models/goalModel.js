import mongoose from "mongoose";

const goalShema = mongoose.Schema(
    {
        user : {
            type : mongoose.Schema.Types.ObjectId ,
            required : true ,
            ref : "users"
        } ,
        text : {
            type : String ,
            required : [true , "Please add a text value"]
        } 
    } ,
    {
        // that will create a createAt and updateAt automatically
        timestamps : true ,

        collection : "goals"
    }
)
export const goalModel = mongoose.model("goals" , goalShema) ;