const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

let userObject = {}

beforeEach(async () => {  
  await Blog.deleteMany({})
  await User.deleteMany({})
  // Create user
  const passwordHash = await bcrypt.hash('sekret', 10)
  userObject = new User({ username: 'root', passwordHash })
  await userObject.save()
  // use userObject._id into Post blog :{...,user:userObject._id}
  const blogObjects = helper.initialBlog.map(blog => new Blog({...blog,user:userObject._id}))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
}, 150000)

describe('when there is initially some blogs saved', () => {
  test('4.8.a blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 150000)
  test('4.8.b the blog list application returns the correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlog.length)
  }, 150000)  
  test('4.9 verifies that the unique identifier property of the blog posts', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  }, 160000)
  describe('addition of a new blog', () => {
    test('4.10 successfully creates a new blog post', async () => {
      const userValid= await api.post('/api/login')
      .send({username:'root', password: 'sekret'})

      const newBlog = {
        title: "MHAMK blog title",
        author: "Mahdi Haydari",
        url: "https://reactpatterns.com/",
        likes: 22,
        user: userObject._id   
      }
      await api
        .post('/api/blogs')
        .set('authorization', `bearer ${userValid.body.token}`)
        .send(newBlog)        
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)
    
      const contents = blogsAtEnd.map(r => r.title)
      expect(contents).toContainEqual(newBlog.title)
    },160000)  
    test('4.11 if the likes property is missing from the request, it will default to the value 0', async ()=>{
      const userValid= await api.post('/api/login')
      .send({username:'root', password: 'sekret'})

      const newBlog = {
        title: "MHAMK blog title",
        author: "Mahdi Haydari",
        url: "https://reactpatterns.com/"   
      }
      await api
        .post('/api/blogs')
        .set('authorization', `bearer ${userValid.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlog.length + 1)
      expect(blogsAtEnd.likes).toEqual(expect.not.objectContaining({likes: undefined || null}))
      
    },150000)
    test('4.12.a the title properties are missing from the request data', async () => {
      const userValid= await api.post('/api/login')
      .send({username:'root', password: 'sekret'})

      const newBlogWithoutTitle = {
        author: "Mahdi Haydari",
        url: "https://reactpatterns.com/",
        likes: 22 
      }
      await api
        .post('/api/blogs')
        .set('authorization', `bearer ${userValid.body.token}`)
        .send(newBlogWithoutTitle)
        .expect(400);
      const blogsAtEndWithoutTitle = await helper.blogsInDb()
      expect(await blogsAtEndWithoutTitle).toHaveLength(helper.initialBlog.length)
    
    }, 150000)  
    test('4.12.b the url properties are missing from the request data', async () => {
      const userValid= await api.post('/api/login')
      .send({username:'root', password: 'sekret'})
      
      const newBlogWithoutURL = {
        title: "MHAMK blog title",
        author: "Mahdi Haydari",
        likes: 22 
      }
      await api
        .post('/api/blogs')
        .set('authorization', `bearer ${userValid.body.token}`)
        .send(newBlogWithoutURL)
        .expect(400);
        
      const blogsAtEndWithoutURL = await helper.blogsInDb()
      expect(await blogsAtEndWithoutURL).toHaveLength(helper.initialBlog.length)
    
    }, 150000)
  })  
  describe('deletion of a blog', () => {
    test('4.13 deleting a single blog post resource', async () => {      
      const userValid= await api.post('/api/login')
      .send({username:'root', password: 'sekret'})

      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]      
      if (userObject._id.toString() === blogToDelete.user.toString()){      
        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('authorization', `bearer ${userValid.body.token}`)
        .expect(204)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlog.length - 1)    
        const contents = blogsAtEnd.map(r => r.title)
        expect(contents).not.toContain(blogToDelete.title)
      }
      else{
        await api
        .delete('/api/blogs/')
        .set('authorization', `bearer ${userValid.body.token}`)
        .expect(400);
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)    
      }     
    }, 150000)
  })
  describe('updation of a blog', () => {
    test('4.14 updating the information of an individual blog post', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]      
      ++blogToUpdate.likes
      await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(202)
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
    })
  }, 150000)
  describe('adding a blog fails with the proper status code 401 Unauthorized', () => {
    test('4.23 if a token is not provided', async () => {

      const newBlog = {
        title: "MHAMK blog title",
        author: "Mahdi Haydari",
        url: "https://reactpatterns.com/",
        likes: 22,
        user: userObject._id   
      }
      await api
        .post('/api/blogs')        
        .send(newBlog)        
        .expect(401)
        .expect('Content-Type', /application\/json/)
      
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlog.length)
  }, 150000)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
