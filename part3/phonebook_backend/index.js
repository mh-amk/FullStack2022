require('dotenv').config()
//const { request, response } = require('express')
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
const app = express()
const Persons = require('./models/persons')

app.use(cors())


/*let persons=[
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
]*/

//let Total_Request=0
// create "middleware"
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

app.use(express.static('build'))

app.get('/api/persons', (request, response,next) => {
  Persons
    .find({})
    .then(persons => response.json(persons))
    .catch((err) => {
      console.log(err)
      next(err)
    })
})
app.get('/api/info',(request,response,next) => {
  Persons.find({})
    .then((persons) =>
      response.send(`phonebook has info for ${persons.length} people<br/><br/>${new Date()}`)
    )
    .catch((err) => {
      console.log(err)
      next(err)
    })
})
app.get('/api/persons/:id', (request, response,next) => {
  Persons.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        next(response.status(404).end())
      }
    })
    .catch((err) =>
    {
      console.log(err)
      next(err)
    })
})
app.delete('/api/persons/:id',(request,response,next) =>
{
  Persons.findByIdAndDelete(request.params.id)
    .then((person) => {
      if(person) return response.status(204).send(`${person.name} Deleted`)
      else return response.status(404).send('The person was not found!')
    })
    .catch((err) =>
    {
      console.log(err)
      next(err)
    })
})
/*function generateId(MaxNumber) {
        return Math.floor(Math.random() * MaxNumber);
    }*/
app.post('/api/persons', (request, response,next) => {
  const body = request.body
  if (!body.name||!body.number) {
    return response.status(400).json({ error: 'name or number missing' })
  }
  Persons.findOne({ name:body.name })
    .then((person) => {
      if(person)
      {
        next(response.status(400).json({ error:`name ${body.name} must be unique` }))
      }
      else
      {
        const PostPerson = new Persons({
          name: body.name,
          number: body.number,
        })
        PostPerson.save()
          .then(savedPerson => {
            console.log('Saved person',savedPerson)
            response.json(savedPerson)
          })
          .catch((err) =>
          {
            console.log(err)
            next(err)
          })
      }
    })
    .catch((err) =>
    {
      console.log(err)
      next(err)
    })

})

app.put('/api/persons/:id', (request, response,next) => {
  const body = request.body
  if (!body.name||!body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  else
  {
    Persons.findByIdAndUpdate(
      body.id,
      { name:body.name,number:body.number },
      { new:true,runValidators:true,context:'query' })
      .then((updatedperson) => {
        console.log('updatedperson',updatedperson)
        return response.status(202).json(updatedperson)
      })
      .catch((err) =>
      {
        console.log(err)
        next(err)
      })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ err: 'unknown endpoint' })

}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  else if(error.name==='ReferenceError'){
    return response.status(500).json({ error: error.message })
  }
  else if(error.name==='Bad Request'){
    return response.status(400).send({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)