const mongoose = require('mongoose')

const cityModel = new mongoose.Schema ({
    city : {type : String, required: true}
}, {timestamps : true})

module.exports = mongoose.model('City', cityModel)