const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }



app.use(requestLogger);
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.static('build'));




app.get('/api/persons', (req,res) => {
    res.json(persons);
    console.log('persons sent', persons);
})

app.get('/info', (req,res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if(person){
        res.json(person);
    }
    else{
        res.status(404).end();
    }
})

app.delete('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !==id);
    res.status(204).end();
})

const generateId = () => {
    const maxId = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0;
    return Math.random() * 100000000000000000;
}

app.post('/api/persons/',(req,res) => {
    const body = req.body;
    console.log('body', body);
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'content missing'
        })
    }
    if(persons.find(person => person.name === body.name)){
        return res.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        name: body.name,
        number:body.number,
        id: generateId()
    }
    persons = persons.concat(person);
    console.log('person added', person);
    res.json(person);
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

app.use(unknownEndpoint);


const PORT = process.env.PORT || 3001;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})