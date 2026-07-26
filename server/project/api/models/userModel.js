import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
  
    tz:{
        type:String,
        required:true,
        length:9,
        //לא מאפשר לששני משתמשים להרשם עם אותה תז
        unique:true
    },
    lastName:{
        type:String,
        required:true,
        length:2
    },
    firstName:{
        type:String,
        required:true,
        length:2
    },
    password:{
        type:String,
        required:true,
        length:2
    }
   
})

export default mongoose.model('user',userSchema)