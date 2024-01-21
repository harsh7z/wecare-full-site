const mongoose = require('mongoose')

const sitterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true
    },
    profilImg:String,
    city:{
        type:String,
        required:true
    },
    about:{
        type:String,
        required:true
    },
    services:{
        type:String,
        required:true
    },
    prices:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bookings: {
        type: Array,
        default: [],
    },

})

module.exports = mongoose.model('sitter',sitterSchema)