describe('login scene e2e specs',() => {
  it('Visit login scene', () => {
    //Arrange

    //Act
    cy.visit('/');

    //Assert

  });

  it('Input field user has the focus when clicked', () => {
    //Arrange

    //Act
    cy.visit('/');
    cy.findByRole('textbox').click();

    //Assert
    cy.findByRole('textbox').should('have.focus');
  });

  it('Shows error message for wrong password input', () => {
    //Arrange
    const user: string = 'admin';
    const wrongPassword: string = '1234';

    //Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('input[name=password]').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(wrongPassword);
    cy.findByRole('button').click();
    cy.findByRole('alert').as('errorMessage');

    //Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', wrongPassword);
    cy.get('@errorMessage').should('exist');


  });

  it('Should navigate when proper password input', () => {
    //Arrange
    const user: string = 'admin';
    const password: string = 'test';

    //Act
    cy.visit('/');
    cy.findByRole('textbox').as('userInput');
    cy.get('input[name=password]').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    //Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list')

  });
});
