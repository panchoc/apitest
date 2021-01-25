const mongoose = require('mongoose');

const usuarioSchema = mongoose.Schema({
    mail:{
        type:String,
        required: true
    },
    pass:{
        type:String,
        required:true
    },
    
})

module.exports = mongoose.model('Users', usuarioSchema)