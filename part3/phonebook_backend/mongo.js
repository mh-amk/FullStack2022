const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const nameNew = process.argv[3]
const numberNew = process.argv[4]
const url= `mongodb+srv://mhamkDB:${password}@cluster0.iefwutn.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
  name:{
    type:String,
    minLenght:5,
    require:true
  },
  number:{
    type:String,
    require:true
  }
})

const Person = mongoose.model('person', personSchema)
if(process.argv.length>4){
  mongoose
    .connect(url)
    //.then((result) => {
    .then(() => {
      console.log('connected')
      const person = new Person({
        name: nameNew,
        number:numberNew
      })

      return person.save()
    })
    .then(() => {
      console.log(`added ${nameNew} number ${numberNew} to phonebook`)
      return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}
if(process.argv.length<4)
{
  mongoose
    .connect(url)
    //.then((result) => {
    .then(() => {
      console.log('Phonebook:\n')
      Person.find({}).then(result => {
        result.forEach(person => {
          console.log(`${person.name} ${person.Number}`)
        })
      })
        .then(() => {
          console.log('\nFind Done')
          mongoose.connection.close()
        })
        .catch((err) => console.log(err))
    })
}