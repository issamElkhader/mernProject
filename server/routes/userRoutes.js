import express  from "express";
import { registerUser , loginUser , getUserData } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const userRouter = express.Router()


userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route("/user").get(protect , getUserData)

export default userRouter ;