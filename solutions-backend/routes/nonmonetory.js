const router =require("express").Router();
const bodyParser=require("body-parser");
const nonmonetory=require("../models/nonmonetory");
const express=require("express");
const app=express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


router.post("/", async (req, res) => {
      try {
        const newnonmonetry = new nonmonetory ({
            item:req.body.item,
            quantity:req.body.quantity,
            name:req.body.name,
            email:req.body.email
        });
        const freshmonetory = await newnonmonetry.save();
  
        res.send("created sucessfully");
      } catch (err) {
        res.send(err.message).status(400);
      }
    
});

router.get("/",(req,res)=>{
  nonmonetory.find()
  .then((nonmonetory) => res.json(nonmonetory))
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