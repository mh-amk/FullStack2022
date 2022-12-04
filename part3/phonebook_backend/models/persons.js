const mongoose = require('mongoose')
const url = process.env.REACT_APP_MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
  //.then(result => {
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLength:5,
    require:true
  },
  number:{
    type:String,
    minLength:8,
    require:true,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{6}|\d{3}-\d{5}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!\n number format(ddd-ddddd or dd-dddddd)`
    } }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('person', personSchema)
