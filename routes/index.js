require('dotenv/config')
var express = require('express');
const app = require('../app');
var router = express.Router();
const Peli = require('../models/pelis')



//envio datos
router.post('/', async (req, res) => {
  req.session.viewCount += 1;
  const post = new Peli({
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    fecha: req.body.fecha
  });

  

  try {
    const guardado = await post.save();

    res.status(200).json({guardado: guardado, user:req.user })
  } catch (error) {
    res.json({ message: error })
  }


});

//trae todo
router.get('/', async (req, res) => {

  try {
    const posts = await Peli.find();
    res.json(posts)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})



//trae por id
router.get('/id/:id', async (req, res) => {
  console.log(req.params)
  try {
    const especifico = await Peli.findById(req.params.id)
    res.json(especifico)
  } catch (error) {
    res.status(400).json({ message: error })
  }

})

//trae por titulo
router.get('/titulo/:titulo', async (req, res) => {
  console.log(req.params)
  try {
    const especifico = await Peli.findOne({ titulo: req.params.titulo })
    res.json(especifico)
  } catch (error) {
    res.json({ message: error })
  }

})

//borrar por id
router.delete('/:id', async (req, res) => {
  try {
    const borrado = await Peli.remove({ _id: req.params.id })
    res.json(borrado)
  } catch (error) {
    res.status(400).json({ message: error })
  }

})

//actualizar  descripcion por id
router.patch('/:id', async (req, res) => {
  console.log(req.body)
  try {
    const actualizado = await Peli.updateOne({ _id: req.params.id },
      {
        $set: { descripcion: req.body.descripcion }
      })
    res.json(actualizado)
  } catch (error) {
    res.status(400).json({ message: error })
  }

})

module.exports = router;
