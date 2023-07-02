const mongoose=require("mongoose");

const fundraiserSchema=new mongoose.Schema({
    orgName:{
        type:String,
        required:true,
    },
    Amount:{
        type:Number,
        required:true,
    },
    contact:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("fundraiser",fundraiserSchema);