//const { func } = require('prop-types')

describe('Blog app', function() {
  beforeEach(function() {
    cy.resetBlog()
    cy.createUser({ name: 'Mahdi Haydari', username: 'mhamk1', password: 'pass1' })
    cy.visit('http://localhost:3000')
  })
  it('5.17 Login form is shown', function() {
    cy.get('#LoginForm-btn').click()
    cy.get('#username').type('mhamk1')
    cy.get('#password').type('pass1')
    cy.get('#login-btn').click()
    cy.contains('Mahdi Haydari logged-in')
  })
  describe('5.18 Login',function() {
    beforeEach(function() {
      cy.resetBlog()
      cy.createUser({ name: 'Mahdi Haydari', username: 'mhamk1', password: 'pass1' })
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.login({ username: 'mhamk1', password: 'pass1' })
      cy.contains('Mahdi Haydari logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()

      //cy.get('.error').contains('Wrong credentials')
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('5.19 When logged in', function() {
    beforeEach(function() {
      cy.resetBlog()
      const user={ name: 'Mahdi Haydari', username: 'mhamk1', password: 'pass1' }
      cy.createUser(user)
      cy.login({ username:user.username, password:user.password })
      cy.visit('http://localhost:3000')
    })

    it('A blog can be created', function() {
      cy.get('#NewBlogForm-btn').click()
      cy.get('#input-title').type('blog\'s title test1')
      cy.get('#input-author').type('blog\'s author')
      cy.get('#input-url').type('http://wwww.url.com')
      cy.get('#add-btn').click()
      cy.contains('blog\'s title test1')
      cy.get('#NewBlogForm-btn').click()
      cy.get('#input-title').type('blog\'s title test2')
      cy.get('#input-author').type('blog\'s author test2')
      cy.get('#input-url').type('http://wwww.url-test2.com')
      cy.get('#add-btn').click()
      cy.contains('blog\'s title test2')
    })
  })
  describe.only('and a blog exists', function() {
    beforeEach(function() {
      cy.resetBlog()
      const user={ name: 'Mahdi Haydari', username: 'mhamk1', password: 'pass1' }
      cy.createUser(user)
      cy.login({ username:user.username, password:user.password })
      cy.CreateBlog({ title:'title test1 minimun likes',author:'author test1',url:'url test1',likes:1 })
      cy.CreateBlog({ title:'title test2 second Maximum likes',author:'author test2',url:'url test2',likes:2 })
      cy.CreateBlog({ title:'title test3 Maximum likes',author:'author test3',url:'url test3',likes:3 })
      cy.visit('http://localhost:3000')
    })

    it('5.20 Click Like', function() {
      cy.get('#ViewBlogDetail-btn1').click()
      cy.contains('likes 1')
        .get('#like-btn1').click()
      cy.get('#ViewBlogDetail-btn0').click()
    })
    it('5.21.a the user who created a blog can delete it', function() {
      const localStorageValue=JSON.parse(localStorage.getItem('loggedBlogappUser'))
      cy.get('#ViewBlogDetail-btn0').click()
      cy.contains('title test3 Maximum likes').parent().as('BlogParent')
      if (cy.get('@BlogParent').should('contain',localStorageValue.name)){
        cy.contains('title test3 Maximum likes')
          .get('#removeBlog-btn0').click()
        cy.get('html').should('not.contain', 'title test3 Maximun likes')
      }

    })
    describe('5.21.b other users cannot delete the blog', function() {
      beforeEach(function(){
        const user={ name: 'user', username: 'username2', password: 'pass2' }
        cy.createUser(user)
        cy.login({ username:user.username, password:user.password })
        cy.visit('http://localhost:3000')
      })
      it('other user delete the blog',function() {
        const localStorageValue=JSON.parse(localStorage.getItem('loggedBlogappUser'))
        cy.get('#ViewBlogDetail-btn0').click()
        cy.contains('title test1').parent().as('BlogParent')
        if (cy.get('@BlogParent').should('not.contain',localStorageValue.name)){
          cy.get('@BlogParent').find('button').should('not.contain','remove')
        }
      })
    })
    describe('5.22 Order blog', function() {
      beforeEach(function(){

      })
      it('Orber Blog (maximum likes & second maximum likes)', function(){
        cy.get('#ViewBlogDetail-btn0').click()
        cy.get('#ViewBlogDetail-btn1').click()
        cy.get('#ViewBlogDetail-btn2').click()
        cy.get('.blog').eq(0).should('contain', 'title test3 Maximum likes')
        cy.get('.blog').eq(1).should('contain', 'title test2 second Maximum likes')
      })
    })

  })
})