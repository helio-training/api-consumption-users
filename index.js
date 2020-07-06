const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5005

let index = 8
let users = [
    {
        "id": 1,
        "name": "Danny",
        "age": 30
    },
    {
        "id": 2,
        "name": "Wesley",
        "age": 62
    },
    {
        "id": 3,
        "name": "Ben",
        "age": 52
    },
    {
        "id": 4,
        "name": "Matt",
        "age": 45
    },
    {
        "id": 5,
        "name": "Weston",
        "age": 40
    },
    {
        "id": 6,
        "name": "Amy",
        "age": 35
    },
    {
        "id": 7,
        "name": "Tim",
        "age": 52
    },
    {
        "id": 8,
        "name": "Mike",
        "age": 36
    }
]

app.use(express.static('public'))

app.use(bodyParser.json())

app.use(cors())

app.get('/', function (req, res) {
    res.send('Hello, Class!')
})

app.post('/', function (req, res) {
    const body = req.body
    console.log(body)
    res.send(body)
})

app.get('/users', function (req, res) {
    res.send(users)
})

app.post('/users', function (req, res) {
    const body = req.body
    body.id = ++index
    users.push(body)
    res.send( users[users.length - 1] )
    // res.send('Got a POST request at /user')
})

app.put('/users/:id', function (req, res) {
    const foundIndex = users.findIndex((ele) => ele.id === req.params.id);
    let results;
    if (foundIndex != -1) {
        users[foundIndex] = req.body;
        results = users[foundIndex];
    } else {
        users.push(req.body);
        index++;
        results = users[users.length - 1];
    }
    res.send(results);
})

app.patch('/users/:id', function (req, res) {
    const foundIndex = users.findIndex((ele) => ele.id === req.params.id);
    let results;
    if (foundIndex){
        users[foundIndex] = req.body;
        results = users[foundIndex];
    } else {
        results = `ID ${id} NOT FOUND`;
    }
    res.send(results);
})

app.delete('/users/:d', function (req, res) {
    users = users.filter((ele) => ele.id !== req.params.id)
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