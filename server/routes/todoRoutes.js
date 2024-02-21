import express from "express";

import {createTodo,deletetodo,gettodos,updatetodos} from "../controllers/todoController.js"

import {protect} from "../middlewares/authMiddlewares.js"

const router = express.Router();

router.route("/").get(protect, gettodos);
router.route("/createtodo").post(protect, createTodo)
router.route("/:id").post(protect,updatetodos).delete(protect,deletetodo);


export default router;