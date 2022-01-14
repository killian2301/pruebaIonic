describe('Login Page', () => {
  before(() => {
    cy.visit('/');
  });

  it('Check if all common items are displayed', () => {
    cy.get('#loginForm').should('be.visible');
    cy.get('.button').should('be.visible');
    cy.get('.logo').should('be.visible');
    cy.get('#email-required').should('not.exist');
    cy.get('#password-required').should('not.exist');
  });

  it('The button must contain the right text', () => {
    cy.get('.button').should('contain', 'Acceder');
  });

  it('The email input should have the correct placeholder', () => {
    cy.get('.email-input').should('have.attr', 'placeholder', 'Email');
  });

  it('The password input should have the correct placeholder', () => {
    cy.get('.password-input').should('have.attr', 'placeholder', 'Contraseña');
  });

  it('The remember toggle can be swithched on and off', () => {
    cy.get('#remember-toggle')
      .click()
      .should('have.attr', 'aria-checked', 'true');
    cy.get('#remember-toggle')
      .click()
      .should('have.attr', 'aria-checked', 'false');
  });

  it('When the user inputs correct email and password, when pushing the submit button, no error message should appear', () => {
    cy.get('.email-input').type('user@user.com');
    cy.get('.password-input').type('123456');
    cy.get('.button').click();

    cy.get('#email-invalid').should('not.exist');
    cy.get('#password-invalid').should('not.exist');
    cy.get('#email-required').should('not.exist');
    cy.get('#password-required').should('not.exist');
  });

  describe('Email Validation', () => {
    it('Required error messages should be shown if the user clicks the submit button whith empty email', () => {
      cy.get('.button').click();
      cy.get('#email-required')
        .should('be.visible')
        .should('contain', 'Este campo es requerido');
    });

    it('Should show invalid email message if the user enters an invalid email', () => {
      cy.get('.email-input').type('user@user');
      cy.get('.button').click();
      cy.get('#email-invalid')
        .should('be.visible')
        .should('contain', 'El email no tiene un formato válido');
      cy.get('#password-required').should('be.visible');
    });
  });

  describe('Password Validation', () => {
    it('Required error messages should be shown if the user clicks the submit button whith empty password', () => {
      cy.get('.button').click();
      cy.get('#password-required')
        .should('be.visible')
        .should('contain', 'Este campo es requerido');
    });

    it('Should show invalid password length message if the user enters a password < 5 chars', () => {
      cy.get('.password-input').type('123');
      cy.get('.button').click();
      cy.get('#password-invalid')
        .should('be.visible')
        .should('contain', 'La contraseña debe tener al menos 5 caracteres');
    });
  });

  describe('Mobile version', () => {
    before(() => {
      cy.viewport('iphone-x');
    });

    it('The title must not be hidden', () => {
      cy.get('.title').should('not.be.visible');
    });
  });

  describe('Login Desktop', () => {
    it('The title must be shown, and have the correct text', () => {
      cy.get('.title').should('be.visible');
      cy.get('.title').should('contain', 'Prueba técnica');
    });
  });
});
