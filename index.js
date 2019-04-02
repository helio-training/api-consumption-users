const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5005

app.use(express.static('public'))

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.post('/', function (req, res) {
    const body = req.body
    console.log(body)
    res.send(body)
})

app.get('/user', function (req, res) {
    const turkey = {};
    console.log(turkey.fly())
    res.send('Got a GET request at /user')
})

app.post('/user', function (req, res) {
    res.send('Got a POST request at /user')
})

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
})

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
})

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))