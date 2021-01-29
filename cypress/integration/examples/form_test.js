describe('Form app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    const nameInput = () => cy.get('input[name="username"]');
    const emailInput = () => cy.get('input[name="email"]');
    const passInput = () => cy.get('input[name="password"]');
    const submitBtn = () => cy.get('.submitBtn');

    it('Username should have an input', () => {
        nameInput().type('Alex');
        nameInput().should('have.value', 'Alex');

    });

    it('Email should have an input', () => {
        emailInput().type('alexwallander@gmail.com');
        emailInput().should('have.value', 'alexwallander@gmail.com');
    });

    it('Password requires an input', () => {
        passInput().type('wally0204!');
        passInput().should('have.value', 'wally0204!');
    });

    it('terms can be pushed', () => {
        cy.get('[type="checkbox"]')
        .check()
    })

    it('can submit a new user', () => {
        cy.contains('something(Alex)').should('not.exist')
        nameInput().type('Alex');
        emailInput().type('alexwallander@gmail.com');
        passInput().type('wally0204!');
        cy.get('[type="checkbox"]')
        .check()
        submitBtn().click();
    });

    it('submit is disabled unless all inputs are filled out', () => {
        submitBtn().should('be.disabled')
        nameInput().type('First input')
        submitBtn().should('be.disabled')
        nameInput().clear()
        emailInput().type('billybobjoe@gmail.com')
        submitBtn().should('be.disabled')
        passInput().type('randompass1234')
        submitBtn().should('be.disabled')
        cy.get('[type="checkbox"]')
        .check()
        submitBtn().should('be.disabled')
        nameInput().type('First input')
        submitBtn().should('not.be.disabled')
    });
})