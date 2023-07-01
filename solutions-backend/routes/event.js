const router =require("express").Router();
const bodyParser=require("body-parser");
const event=require("../models/event");
const express=require("express");
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


router.post("/", async (req, res) => {
      try {
        const newevent = new event ({
            EventName:req.body.EventName,
            Date:req.body.Date,
            Desc:req.body.Amount,
            location:req.body.contact
        });
        const freshevent = await newevent.save();
  
        res.send("created sucessfully");
      } catch (err) {
        res.send(err.message).status(400);
      }
    
});

router.get("/",(req,res)=>{
  event.find()
  .then((event) => res.json(event))
  .catch((err) => res.status(400).json("Error: " + err));
});

// router.get("/:email", async (req, res) => {
//   try{
//     const feedback = await Feedback.findOne({ email: req.params.email });
//   if (feedback) {
//     res.send(feedback);
//   } else {
//     res.status(404).json("user not found");
//   }
//   }
//   catch(err){
//      res.sendStatus(400).json(err);
//   }
// });




module.exports = router;