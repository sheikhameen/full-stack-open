describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Sheikh Ameen',
      username: 'ameen',
      password: 'ameenpassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.get('html').should('not.contain', 'Create new')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('ameen')
      cy.get('#password').type('ameenpassword')
      cy.contains('Login').click()

      cy.get('html').should('contain', 'Sheikh Ameen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('ameen')
      cy.get('#password').type('wrongpassword')
      cy.contains('Login').click()

      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Sheikh Ameen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'ameen', password: 'ameenpassword'
      }).then(response => {
        window.localStorage.setItem('loggedBloglistUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('Test URL')

      cy.get('#create-button').click()

      cy.contains('Test title')
      cy.contains('Test Author')
    })

    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('Test title')
        cy.get('#author').type('Test Author')
        cy.get('#url').type('Test URL')
        cy.get('#create-button').click()
      })

      it('A blog can be liked', function() {
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.get('.likeCount').contains('1')
      })

    })
  })
})