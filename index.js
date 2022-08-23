const express = require('express')
const app = express()
const countries = require('./countries.json')
const usaDaily = require('./usa_daily.json')
const { validateToken, authorize } = require('./utils')
const cors = require("cors")

app.listen(3000, console.log("Servidor encendido. 🟢: http://localhost:3000"))
app.use(express.json())
app.use(cors());

app.get("/api/total", (req, res) => {
    res.json(countries)
})

app.post('/api/login', authorize)

app.get("/api/country/usa", validateToken, (req, res) => {
    res.json(usaDaily)
})