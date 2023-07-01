const mongoose=require("mongoose");

const EventSchema=new mongoose.Schema({
    EventName:{
        type:String,
        required:true,
    },
    Date:{
        type:String,
        required:true,
    },
    Desc:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("events",EventSchema);