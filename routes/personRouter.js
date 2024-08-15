const express = require("express");
const router = express.Router();
const Person = require('./../models/Person');

router.post('/', async (req,res)=> {
  try{
    const data = req.body //Assuming that the request body conatins the person data

  //Creating a new person document using the mongoose model
  const newPerson = new Person(data);
  //Save the new person to the database.
 const response = await newPerson.save();
 console.log('data saved ');
 res.status(200).json(response);
  
}
catch(err){
  console.log(err);
  res.status(500).json({error:"internal Server Error"})
  }
 
});

router.get('/', async (req,res)=>{
  try{
    const data = await Person.find();
    console.log('data Fethched successfully ');
    res.status(200).json(data);
  

  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal Server Error"})
  }
});

//End points
router.get('/:worktype',async (req, res)=>{  // here work is the name of a variable you can change it.
  // Extract the work type from the URL parameter
  try{
    const worktype = req.params.worktype;
  if(worktype == "chef"||worktype =="manager"||worktype == "waiter"){
    const response =await Person.find({work:worktype});
    console.log ("response fetched");
    res.status(200).json(response);
  }else{
    res.status(404).json({error: 'Invalidwork type'});
  }

  }catch(err){

  }
});

router.put('/:id',async(req, res)=>{
  try{
    const personId = req.personId // Extract the id from URL parameter
    const updatedPersonData =req.body;

    const response =await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new:true, //Return the updated document
      runValidators:true // Run Mongoose validation
    })
    if (!response){
      return res.status(404).json({error:'Person not found'})
    }
    console.log("Data is updated");
    res.status(200).json(response)
  }catch(err){
    console.log(err);
    res.status(500).json({error:"internal Server Error"})
  }
});
router.delete('/:id',async(req, res)=>{
try{
  const personId = req.personId // Extract the id from URL parameter
  //Assuming that you have a person model
  const response = await Person.findByIdAndRemove(personId);
  if(!response){
    return res.status(404).json({error:'Person not found'})
  }
  console.log("Data is deleted");
  res.status(200).json({message: 'person Deleted Successfully'});

}catch(err){
  console.log(err);
  res.status(500).json({error:"internal Server Error"})
}
})
module.exports = router;