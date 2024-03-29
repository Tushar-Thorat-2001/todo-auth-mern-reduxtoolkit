import express from "express"

import {authUser,registerUser,getUserProfile} from "../controllers/userController.js"
import { protect } from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect,getUserProfile)

export default router;