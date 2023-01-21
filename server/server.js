import express from "express" ;
import dotenv from "dotenv";
import colors from "colors";
import goalsRouter from "./routes/goalRoutes.js";
import bodyParser from "body-parser";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/database.js";
import userRouter from "./routes/userRoutes.js";


// get the variables environnement
dotenv.config()
const PORT =  process.env.PORT || 5000 ;
const CONNECTION_URL = process.env.MONGO_URL

// connect to mongodb database
connectDB(CONNECTION_URL)

//
const app = express()
app.use(bodyParser.json({limit : "30mb" , extended : true}))
app.use(bodyParser.urlencoded({limit : "30mb" , extended : true}))

// set the app routes
app.use("/api/goals" , goalsRouter)
app.use("/api/users" , userRouter)



//
app.listen(PORT , () => {
    console.log("server started on port : ",PORT)
})