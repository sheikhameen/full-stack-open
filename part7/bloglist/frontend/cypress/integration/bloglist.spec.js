describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      name: 'Sheikh Ameen',
      username: 'ameen',
      password: 'ameenpassword'
    })
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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({
        username: 'ameen',
        password: 'ameenpassword'
      })
    })

    it('A blog can be created', function () {
      cy.contains('Create new blog').click()
      cy.get('#title').type('Test title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('Test URL')

      cy.get('#create-button').click()

      cy.contains('Test title')
      cy.contains('Test Author')
    })

    describe('A blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog to be liked',
          author: 'GoodPerson',
          url: 'https://likedblog.com'
        })
      })

      it('A blog can be liked', function () {
        cy.contains('view').click()
        cy.get('#like-button').click()
        cy.get('.likeCount').contains('1')
      })
    })
    describe('Several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Visual studio code',
          author: 'Microsoft',
          url: 'https://visualstudio.microsoft.com',
          likes: 10
        })
        cy.createBlog({
          title: 'Hello there',
          author: 'pillow case',
          url: 'https://fake.com',
          likes: 5
        })
        cy.createBlog({
          title: 'Blog by Ameen',
          author: 'Ameen',
          url: 'https://hello.com',
          likes: 15
        })
      })

      it('a blog can be deleted by creator', function () {
        cy.contains('Hello there').parent().contains('view').click()
        cy.contains('Hello there').parents('.blog').contains('remove').click()
        cy.get('html').should('not.contain', 'Hello there')
      })

      it('blog cannot be deleted by other users', function () {
        window.localStorage.removeItem('loggedBloglistUser')
        cy.createUser({
          name: 'Clark Kent',
          username: 'superman',
          password: 'supermanpassword'
        })
        cy.login({
          username: 'superman', password: 'supermanpassword'
        })
        cy.contains('Blog by Ameen').parent().contains('view').click()
        cy.contains('Blog by Ameen').parents('.blog').should('not.contain', 'remove')
      })

      it('blogs are ordered by likes', function () {
        cy.get('.blog').then(blogs => {

          blogs.map( (i, blog) => {
            cy.wrap(blog).contains('view').click() // Open blogs

            cy.wrap(blog).get('.likeCount').then(likeSpan => {
              cy.wrap(likeSpan[i]).invoke('text').then(parseFloat).then(val => {
                if (i+1 === blogs.length) {
                  cy.wrap(likeSpan[i]).invoke('text').then(parseFloat).should('be.gte', 0)
                  return
                }
                cy.wrap(likeSpan[i+1]).invoke('text').then(parseFloat).should('be.lte', val)
              })
            })

          })
        })
      })

    })
  })
})