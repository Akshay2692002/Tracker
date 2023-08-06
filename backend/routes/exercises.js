const express=require('express');
const router=express.Router();

let Exercises=require('../models/exercise');

router.get('/',(req,res)=>{
  Exercises.find()
    .then(exercise=>{
      res.json(exercise);
    })
    .catch(err=>res.status(400).json('Errror: '+err))
    
});

router.post('/add',(req,res)=>{
  const username=req.body.username;
  const description=req.body.description;
  const duration=Number(req.body.duration);
  const date=Date.parse(req.body.date);

  const newExercise = new Exercises({
    username,
    description,
    duration,
    date,
  });
  newExercise.save()
    .then(()=>res.json('Exercise added!'))
    .catch(err=>res.status(400).json('Errror: '+err));
});

router.get('/:id',(req,res)=>{
  Exercises.findById(req.params.id)
    .then(exercise=>res.json(exercise))
    .catch(err=>res.status(400).json("Error: "+err));
});

router.delete('/:id',(req,res)=>{
  Exercises.findByIdAndDelete(req.params.id)
    .then(()=>res.json("Deleted"))
    .catch(err=>res.status(400).json("Error: "+err));
});
router.post('/update/:id',(req,res)=>{
  Exercises.findById(req.params.id)
    .then(exercise=>{
     
      exercise.username=req.body.username;
      exercise.description=req.body.description;
      exercise.duration=req.body.duration;
      exercise.date=req.body.date;
    
      exercise.save()
        .then(()=>res.json("Exercise Updated"))
        .catch(err=>res.status(400).json("Error: "+err));
    })
    .catch(err=>res.status(400).json("Error: "+err));
});

module.exports=router;