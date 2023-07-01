const router =require("express").Router();
const bodyParser=require("body-parser");
const Feedback=require("../models/fundraiser");
const express=require("express");
const fundraiser = require("../models/fundraiser");
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


router.post("/", async (req, res) => {
      try {
        const newFundraiser = new fundraiser ({
            orgName:req.body.orgName,
            email:req.body.email,
            Amount:req.body.Amount,
            contact:req.body.contact
        });
        const freshfundraiser = await newFundraiser.save();
  
        res.send("created sucessfully");
      } catch (err) {
        res.send(err.message).status(400);
      }
    
});

router.get("/",(req,res)=>{
  fundraiser.find()
  .then((fundraiser) => res.json(fundraiser))
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

