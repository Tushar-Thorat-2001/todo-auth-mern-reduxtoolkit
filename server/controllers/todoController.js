import asyncHandler from "express-async-handler";

import TodoModel from "../models/TodoModel.js"

/**
 * @desc		Get all todo
 * @route		GET /todo
 * @access	 private
 */

export const gettodos =  asyncHandler(async(req,res)=>{
   
        const todos = await TodoModel.find({});
        res.json(todos)
   
})

/**
 * @desc		POST create todo
 * @route		POST /create todo
 * @access	 private
 */

export const createTodo = asyncHandler(async(req,res)=>{
    const { user, todo } = req.body;
    const newTodo = await TodoModel.create({ user, todo });
    res.status(201).json(newTodo);
})

/**
 * @desc		POST update todo
 * @route		POST /update todo
 * @access	 private
 */


export const updatetodos = asyncHandler(async(req,res)=>{
   const {todo}= req.body

   const updatetodo = await TodoModel.findById(req.params.id);

   if(updatetodo){
    updatetodo.todo = todo
    const newtodo = await updatetodo.save();
    res.json(newtodo)

   }else{
    res.status(404);
    throw new Error('Todo not found')
   }
});

/**
 * @desc		Delete update todo
 * @route		Delete /delete todo
 * @access	 private
 */

export const deletetodo = asyncHandler(async(req,res)=>{
   

    if(req.params.id){
       const deletetodo = await TodoModel.findByIdAndDelete(req.params.id);
       res.json({ message: "User deleted successfully", deletetodo });
    }else{
        res.status(404);
        throw new Error("todo not found")
    }
})
