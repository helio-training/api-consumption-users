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
        "name": "Danny"
    },
    {
        "id": 2,
        "name": "Wesley"
    },
    {
        "id": 3,
        "name": "Ben"
    },
    {
        "id": 4,
        "name": "Matt"
    },
    {
        "id": 5,
        "name": "Weston"
    },
    {
        "id": 6,
        "name": "Amy"
    },
    {
        "id": 7,
        "name": "Tim"
    },
    {
        "id": 8,
        "name": "Mike"
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

app.put('/users', function (req, res) {
    const { id, ...rest } = req.body;
    const foundIndex = users.findIndex((ele) => ele.id === id);
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

app.patch('/users', function (req, res) {
    const { id, ...rest } = req.body;
    const foundIndex = users.findIndex((ele) => ele.id === id);
    let results;
    if (foundIndex){
        users[foundIndex] = req.body;
        results = users[foundIndex];
    } else {
        results = `ID ${id} NOT FOUND`;
    }
    res.send(results);
})

app.delete('/users', function (req, res) {
    const body = req.body
    users = users.filter((ele) => ele.id !== body.id)
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