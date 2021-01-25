const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    titulo:{
        type:String,
        required: true
    },
    descripcion:{
        type:String,
        required:true
    },
    fecha:{
        type:String,
        required:false
    }
})

module.exports = mongoose.model('Posts', postSchema)