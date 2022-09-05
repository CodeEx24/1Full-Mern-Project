const mongoose = require('mongoose');

//Models for the database
const chartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    labels: [String],
    colors: [String],
    numbers: [Number]
})

/* chartSetting is must be singular version of the name of collection,
In this case the name of collection is 'chartSettings' but the parameter is without s */
module.exports = mongoose.model('chartSetting', chartSchema)