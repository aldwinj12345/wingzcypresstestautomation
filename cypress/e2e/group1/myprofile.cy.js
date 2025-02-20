/// <reference types="cypress" />

//I can also put this under fixtures and create a .json file then will call it under
//Before Block to call it once but for now i decided to put it in here
const baseUrl = 'https://auth.wingz.me/auth/signin'
const username = 'tester@wingz.com'
const password = 'TestAccount123'



beforeEach('Launch Wingz app Login Page', ()=>{
    cy.visit(baseUrl)
      .wait(3000)

    //assert page title - Wingz
    cy.title().should('eq', 'Wingz')
    
    //change the window size of the browser
    cy.viewport(1280, 1024)
  })


  describe('My Profile Test Suites',()=>{
    it('Test Correct My Profile Page Destination and My Profile Tab UI',()=>{
        //by using custom command for login, since i only have to test the My Profile page
        //you can find the custom command at /support/commands.js
        cy.userLogin('#username', '#password', username, password, 'form.ng-valid-email button[type="submit"]')

        
        // I had to use cy.origin() because if I don't, I wont' be able to continue.
        // Cypress has security restrictions that prevent it from directly interacting with 
        //a different urls, like the one supposedly it initially visited which is the baseUrl
        // however, after a succesfful login, another url which is considered origin url
        // so i don't switch or use the origin then it won't work the usual assertions and executions
        
        //here after login then i have to switch to origin url, i don't know even know how ther is
        // other than url test
        cy.origin('https://app.wingz.me',()=>{
          //verify the url expected destination after a successful login but on the origin url
          cy.url().should('eq', 'https://app.wingz.me/book')

          //click Account link
          cy.get('li a[href="/account"]')
            .wait(3000)
            .click()

          //click My Profile Tab
          cy.get('li a[href="/account/profile"]')
            .click()
            .wait(3000)

          //verify url expected destination
          cy.url().should('eq', 'https://app.wingz.me/account/profile')

          //verify My Profile Tab text
          cy.get('li a[href="/account/profile"]')
            .wait(2000)
            .should(($el) => {
              const text = $el.text().replace(/\u00A0/g, ' ').replace(/\s+/g, ' ').trim(); // Replace nbsp, multiple spaces, and trim
              expect(text).to.equal('My Profile');
            })
          
          //after i click the My profile tab  
          //verify My Profile Tab text background color and font text color
          cy.get('li a[href="/account/profile"]')
            .wait(2000)
            .should('have.css', 'color', 'rgb(255, 255, 255)')
            .and('have.css', 'background-color', 'rgb(166, 166, 219)')
          
        }) // origin ends here
    }) //test block ends here
    it('Test My Profile Form page title',()=>{
      //user login
      cy.userLogin('#username', '#password', username, password, 'form.ng-valid-email button[type="submit"]')

      //switch to origin url
      cy.origin('https://app.wingz.me',()=>{
        //click Account link
        cy.get('li a[href="/account"]')
          .wait(3000)
          .click()

        //click My Profile Tab
        cy.get('li a[href="/account/profile"]')
          .click()
          .wait(3000)
        
        //click My Profile Tab link
        cy.get('li a[href="/account/profile"]')
          .click()
          .wait(3000)

        //verify My Profile Form title
        cy.get('div.title h2')
          .wait(3000)
          .should('have.text', 'My Profile')
          .and('have.css', 'font-weight', '700') // it means it is in bold text
          .and('have.css', 'color', 'rgb(51, 50, 104)')
      }) //origin ends here
    }) //test block ends here
    it('Test Gender section',()=>{
      //user login
      cy.userLogin('#username', '#password', username, password, 'form.ng-valid-email button[type="submit"]')

      cy.origin('https://app.wingz.me',()=>{
        //click Account link
        cy.get('li a[href="/account"]')
          .wait(3000)
          .click()

        //click My Profile Tab
        cy.get('li a[href="/account/profile"]')
          .click()
          .wait(3000)
        
        //verify gender section
        //verify gender title section
        cy.get('form[name="form"] > div:nth-child(1) > label')
          .wait(3000)
          .should('have.text', 'Gender')
          .and('have.css',  'color', 'rgb(153, 152, 179)')
          .and('have.css', 'font-weight', '400')

        //verify Male radio button
        cy.get('label > input[type="radio"][value="M"]')
          .wait(3000)
          .should('be.enabled')
          .and('have.css', 'border-color', 'rgb(51, 50, 104)') //by default male radion button is selected
          .and('be.checked') //assert that it is checked
        //verify male radio button text
        cy.get('[name="gender"][value="M"] > label > span')
          .wait(2000)
          .should('have.text', 'Male')
          .and('have.css', 'color', 'rgb(51, 50, 104)') //text color
          .and('have.css', 'font-weight', '700') //bold text
        //verify that the radio male button is checked 
        cy.get('[name="gender"][value="M"] > label')
          .wait(3000)
          .should('have.attr','class', 'checked') //this is an optional, just doubling the asserttion in checking if the radion button male is checked
           

        //verify Female radio button 
        cy.get('label > input[type="radio"][value="F"]')
          .wait(2000)
          .should('be.enabled')
          .and('not.be.checked') //assert that it is not checked by default since male is checked
        cy.get('[name="gender"][value="F"] > label > span')
          .wait(2000)
          .should('have.text', 'Female')
        
        //here verify when female radio button is click
        cy.get('[name="gender"][value="F"] > label > span')
          .click() //select or tick the radio button of the Female
          .wait(3000)
          .should('have.css', 'border-color', 'rgb(51, 50, 104)') //female radion button is now selected
       //verify if checked
       cy.get('label > input[type="radio"][value="F"]')
          .wait(3000)
          .should('be.enabled')   
          .and('be.checked') //assert that it is now checked
        //verify again female radio button ui
        cy.get('[name="gender"][value="F"] > label > span')
          .wait(2000)
          .should('have.text', 'Female')
          .and('have.css', 'color', 'rgb(51, 50, 104)') //text color
          .and('have.css', 'font-weight', '700') //bold text

        //lastly i will assert Male radion button, should not be checked anymore
        cy.get('label > input[type="radio"][value="M"]')
          .wait(3000)
          .should('be.enabled')
          .and('not.be.checked')

      })//orgin ends here
    })//test block ends here

  })