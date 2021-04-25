export const getEnabledDetectButton = () =>  getDetectButton().should('not.be.disabled');
export const getDetectButton = () => cy.get('button').contains('Detect').parent();