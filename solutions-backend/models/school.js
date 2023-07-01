const mongoose=require("mongoose");

const SchoolSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    poi:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("school",SchoolSchema);