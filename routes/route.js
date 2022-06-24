const express = require('express');
const router = express.Router();
const Property = require('../models/property')


//GET all properties
router.get('/getproperties', async (req, res) => {
   const properties = await Property.find({});
   try {
      res.send(properties);
    } catch (error) {
      res.status(500).send(error);
    }
})

 
 
 
 
 
 //POST: create a new property record 
 router.post('/addproperty', async (req, res) => {
    var newProperty = new Property({
           address : req.body.address,
           propertyValue : req.body.propertyValue,
           monthlyIncome : req.body.monthlyIncome,
           monthlyExpenses : req.body.monthlyExpenses
        })

      newProperty.save((err, property) => {
        if(err){
            res.json({msg: 'Failed to add new property'});
        }
        else{
            res.json({msg: 'Property added successfully'});
        }
    })
 })
 
 
 
 
 
 
 //DELETE: delete a particular property by id
 router.delete('/deleteproperty/:id', async (req, res) => {
    await Property.deleteOne({"_id": req.params.id})
       .then(result => {
          if(result.deletedCount === 0){
            res.json({msg: 'No record was deleted'});
          }
          else{
            res.json({msg: 'Property successfully deleted'});
          }
       })
       .catch(error => res.json(error))
 })
 
 
 
 
 
 
 
 //UPDATE: update an existing property
 router.put('/updateproperty/:id', async (req, res) => {
    await Property.updateMany({"_id": req.params.id},
    {
        $set: req.body
    })
    .then(result => {
        res.json({msg: 'Property Updated Successfully'});
    }) 
    .catch(error => res.json(error))
})
 
 
 
 
 
 
 
 //GET most valuable property
 router.get('/getmostvaluableproperty', async (req, res) => {
    await Property.find().sort({"propertyValue":-1}).limit(1)
       .then(result => {
          res.json(result);
       })
       .catch(error => console.error(error))
 })
 
 
 
 
 
 //GET properties sorted by income descending
 router.get('/getmonthlyincomedescending', async (req, res) => {
    await Property.find().sort({"monthlyIncome":-1})
       .then(results => {
          res.json(results);
       })
       .catch(error => console.error(error))
 })
 

module.exports = router;