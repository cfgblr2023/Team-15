const mongoose=require("mongoose");

const nonmonetory=new mongoose.Schema({
    item:{
        type:String,
        required:true,
    },
   quantity:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("nonmonitory",nonmonetory);