import express from "express" ;
const goalsRouter = express.Router()
import { getGoals  , setGoals , updateGoals , deleteGoals} from "../controllers/goalControllers.js";
import { protect } from "../middleware/authMiddleware.js";

// methode 1 =>
// goalsRouter.get("/" , getGoals)

// goalsRouter.post("/" ,setGoals)

// goalsRouter.put("/" ,updateGoals)

// goalsRouter.delete("/" ,deleteGoals)

// methode 2 =>
goalsRouter.route("/").get(protect , getGoals).post(protect , setGoals)

goalsRouter.route("/:id").delete(protect ,deleteGoals).put(protect  , updateGoals)

export default goalsRouter ;