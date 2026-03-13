/// <reference types="cypress"/>

import { faker } from '@faker-js/faker';

describe('Testes End To End do fluxo de cadastro e login', () => {

    beforeEach(() => {
        cy.visit('/register.html');
    });

    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()
        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('21976543876')
        cy.get('#password').type('senha321')
        cy.get('#confirm-password').type('senha321')
        cy.get('#terms-agreement').click()
        cy.get('#register-btn').click()
        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome);
        //login
       cy.visit('/login.html');
        cy.login(email, 'senha321');
        // Resultado esperado 
        cy.url().should('include', 'dashboard');
        cy.get('#user-name').should('be.visible').and('contain', nome);

    });
});