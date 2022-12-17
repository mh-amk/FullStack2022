const personsRouter = require('express').Router()
const Persons =  require('../models/persons')

personsRouter.get('/', (request, response,next) => {
  Persons
    .find({}).then(persons => response.json(persons))
})

personsRouter.get('/:id', (request, response,next) => {
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
      next(err)
    })
})

personsRouter.post('/', (request, response,next) => {
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
          .then(savedPerson => response.json(savedPerson))
          .catch((err) => next(err))
      }
    })
    .catch((err) => next(err))
})
personsRouter.delete('/:id',(request,response,next) =>
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
personsRouter.put('/:id', (request, response,next) => {
  const body = request.body
  if (!body.name||!body.number) {
    return response.status(400).json({
      error: 'name or number missing'
    })
  }
  else
  {
    Persons.findByIdAndUpdate(request.params.id, { name:body.name,number:body.number },
      { new:true,runValidators:true,context:'query' })
      .then((updatedperson) => {
        return response.status(202).json(updatedperson)
      })
      .catch((err) => next(err))
  }
})
module.exports = personsRouter