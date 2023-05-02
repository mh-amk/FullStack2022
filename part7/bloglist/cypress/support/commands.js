// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('resetBlog', () => {
  cy.request('POST', 'http://localhost:3003/api/testing/reset')
})
Cypress.Commands.add('createUser', ({ name, username, password }) => {

  const user = {
    name: name,
    username: username,
    password: password
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', { username, password })
    .then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
})
Cypress.Commands.add('CreateBlog',({ title,author,url,likes }) => {
  const PostBlog = {
    title: title,
    author: author,
    url: url,
    likes:likes
  }
  cy.request({
    url:'http://localhost:3003/api/blogs/',
    method:'POST',
    body: PostBlog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` }
  })
    .then(response =>
      response
      //cy.visit('http://localhost:3000')
    )
})
/*Cypress.Commands.add('DeleteBlog',(id) => {
  cy.request({
    url:'http://localhost:3003/api/blogs/',
    method:'Delete',
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}` }
  })
    .then(response => cy.visit('http://localhost:3000'))
})*/

Cypress.Commands.add('ReturnAccountName',() => {
  return JSON.parse(localStorage.getItem('loggedBlogappUser'))
})