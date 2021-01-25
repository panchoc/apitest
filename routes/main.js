var express = require('express');
var router = express.Router();

router.get('/', (req, res)=>{
    res.json({
        estado:true,
        mensaje:"online"
    })
})


module.exports = router