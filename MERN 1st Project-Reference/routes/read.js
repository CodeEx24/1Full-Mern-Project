//Initial Requirement
const express = require('express');
const router = express.Router();
const chartModel = require('../models/chartSettings.js')

//routes
router.get('/all', (req, res)=>{
    chartModel.find((err, data)=>{
        if(err){
            //Problems when reading the information
            console.log("Something is wrong: "+ err);
            res.status(500).json({
                success: false, 
                message: 'Problems when reading the information'
            })
        }else{
            //Everything is working. The information was read successfully
            console.log("The chart settings was successfully read the data");
            res.status(200).json({
                success: true, 
                message: 'The chart settings was read',
                result: data
            })
        }
    })
})

router.get('/:chartId', (req, res)=>{
    const chartId = req.params.chartId;

    chartModel.findOne({
        _id : chartId
    }, (err, data) => {
        if(err){//Problems when reading the information
            console.log("Something is wrong: "+ err);
            res.status(500).json({
                success: false, 
                message: 'Problems when reading the chart with ID '+ chartId +"."
            })
        }else{
            //Everything is working. The information was read successfully
            console.log("The chart settings was successfully read the data");
            res.status(200).json({
                success: true, 
                message: 'The chart settings was read',
                result: data
            })
        }
    })
})

module.exports = router;