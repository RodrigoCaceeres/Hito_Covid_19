const users = require('./usuarios.json')
const jwt = require('jsonwebtoken')
const secretKey = "SECRET KEY"

const validateToken = (req, res, next) => {
    try {
        const authorization = req.header("Authorization")
        if (!authorization) throw "Ningún token recibido"
        const [, token] = authorization.split("Bearer ")
        const tokenValido = jwt.verify(token || '', secretKey)
        if (tokenValido) next()
    } catch (error) {
        res.status(500).send(error)
    }
}

const authorize = (req, res) => {
    try {
        const { email, password } = req.body
        const userExists = users.some(u => u.email == email && u.password == password)
        if (userExists) {
            const token = jwt.sign({}, secretKey)
            res.send(token)
        } else throw "Usuario o contraseña incorrectos"
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = { validateToken, authorize }