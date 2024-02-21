import mongoose from "mongoose";
import brcypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
},{timestamps:true})


userSchema.methods.matchPassword = async function (enteredPassword) {
    return await brcypt.compare(enteredPassword, this.password);
  };

 userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      next();
    }
  
    const salt = await brcypt.genSalt(10);
    this.password = await brcypt.hash(this.password, salt);
  });
  
const userModel = mongoose.model("user",userSchema)


export default userModel;