const jwt = require('jsonwebtoken');

const verificar = (req, res, next) =>{
    let token = req.header('token');
    if(!token){
        return res.status(401).json({error: "no tiene permisos"})
    }
    try {
        let verificado = jwt.verify(token, process.env.TOKEN);
        req.user = verificado;
        next()
    } catch (error) {
        res.status(400).json({ error: "token invalido"})
    }
}

module.exports = verificar