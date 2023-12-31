const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const Person = require('./models/person');
const app = express();

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({error: error.message})
    }
    
    next(error)
}


app.use(requestLogger);
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());
app.use(express.static('build'));


app.get('/api/persons', (req,res) => {
    Person.find({}).then(persons => {
        res.json(persons)
        console.log('persons retrieved', persons);
    })
})

app.get('/info', (req,res) => {
    const date = new Date();
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (req,res,next) => {

    Person.findById(req.params.id)
        .then(person =>{
            if(person){
                res.json(person);
            }
            else{
                res.status(404).end();
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
    
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(error => next(error))
})


app.post('/api/persons',(req,res,next) => {
    const body = req.body;
    console.log('body', body);

    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'content missing'
        })
    }

    //Name must be unique
    Person.findOne({name:body.name}).then(person => {
        if(person){
            return res.status(400).json({
                error: 'name must be unique'
            })
        }
        else{
            const person = new Person({
                name: body.name,
                number: body.number,
            })
    
            person.save()
                .then(savedPerson => {
                res.json(savedPerson);
            })
            .catch(error => next(error))
        }
    })
})



app.use(unknownEndpoint);
app.use(errorHandler)


const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`);
})