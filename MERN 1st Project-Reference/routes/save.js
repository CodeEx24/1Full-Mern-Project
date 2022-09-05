//Initial Requirement
const express = require('express');
const router = express.Router();

const chartModel = require('../models/chartSettings.js')

//routes
router.post('/', (req, res)=>{
    //Getting the information came from the browser
    const input = req.body;

    const newDocument = new chartModel({
        title: input.title,
        description: input.description,
        labels: input.labels,
        colors: input.colors,
        numbers: input.numbers
    })

    newDocument.save((err, data) => {
        if(err){
            //Problems when saving the information
            console.log("Something is wrong: "+ err);
            res.status(500).json({success: false, message: 'Problems when saving the information'})
        }else{
            //When there is no error this will 
            console.log("The chart settings was successfully imported");
            res.status(200).json({success: true, message: 'The chart settings was saved'})
        }
    })
})

module.exports = router;