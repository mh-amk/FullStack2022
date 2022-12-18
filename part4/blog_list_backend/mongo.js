const mongoose = require('mongoose')
const blogs = require('./models/blogs')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const titleNew = process.argv[3]
const authorNew = process.argv[4]
const url= `mongodb+srv://mhamkDB:${password}@cluster0.iefwutn.mongodb.net/BloglistApp?retryWrites=true&w=majority`

const blogsSchema = new mongoose.Schema({
  title:  String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('blog', blogsSchema)
if(process.argv.length>4){
  mongoose
    .connect(url)
    .then(() => {
      console.log('connected')
      const blog = new Blog({
        title: titleNew,
        author:authorNew
      })

      return blog.save()
    })
    .then(() => {
      console.log(`added title ${titleNew} author ${authorNew} to phonebook`)
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
      console.log('Blogs List:\n')
      blogs.find({}).then(result => {
        result.forEach(blog => {
          console.log(`${blog.title} ${blog.author}`)
        })
      })
        .then(() => {
          console.log('\nFind Done')
          mongoose.connection.close()
        })
        .catch((err) => console.log(err))
    })
}