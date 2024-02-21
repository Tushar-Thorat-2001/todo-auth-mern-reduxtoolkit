import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    todo:{
        type:String,
        required:true
    }
},{timestamps:true})


const TodoModel = new mongoose.model("todo",todoSchema);

export default TodoModel;