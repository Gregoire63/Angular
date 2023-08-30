describe('Ponyracer home page', () => {
  it('should display a headline', () => {
  cy.visit('/');
  cy.get('h1').should('contain', 'Supabase + Angular');
  });
});
describe('Ponyracer home page', () => {
  it('should display a headline', () => {
  cy.visit('/checklist');
  cy.get('h1').should('contain', 'Supabase + Angular');
  });
});