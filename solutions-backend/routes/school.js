const router =require("express").Router();
const bodyParser=require("body-parser");
const school = require("../models/school");
const express=require("express");
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


router.post("/", async (req, res) => {
      try {
        const newschool = new school ({
            name:req.body.EventName,
            poi:req.body.Date,
            email:req.body.Amount,
            location:req.body.contact
        });
        const freshschool = await newschool.save();
  
        res.send("created sucessfully");
      } catch (err) {
        res.send(err.message).status(400);
      }
    
});

router.get("/",(req,res)=>{
  school.find()
  .then((school) => res.json(school))
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