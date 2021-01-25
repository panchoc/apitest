var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/usuario')
const bcrypt = require('bcrypt')

/* GET users listing. */
//usuario
router.post('/new', async (req, res) => {

/*
 validar formato y pass hapi/joi
 . . .
 
 */
  
  let existe = await User.findOne({mail: req.body.mail})
  if(existe){
    return res.status(400).json({error:"mail esta registrado"})
  }

  let salt = await bcrypt.genSalt(10);
  let pass = await bcrypt.hash(req.body.pass, salt)

  const postUser = new User({
    mail: req.body.mail,
    pass: pass,
    
  });

  try {
    const guardado = await postUser.save();
    
    res.status(200).json({guardado:guardado})
  } catch (error) {
    res.json({ message: error })
  }


});



router.post('/login', async (req, res)=>{
let user = await User.findOne({mail: req.body.mail})
if(!user){
  return res.status(400).json({error: true, mensaje: "usuario no existe"})
}
let validPass = await bcrypt.compare(req.body.pass, user.pass)
if(!validPass){
  return res.status(400).json({error: true , mensaje: "contraseña inválida"})
}

let token = jwt.sign({
  name: user.nombre,
  id:user._id
}, process.env.TOKEN)

res.header('token', token).json({
  user:user.mail,
  token:token
})

})

module.exports = router;
