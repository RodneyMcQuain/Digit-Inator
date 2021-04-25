import { isCorrectNumber } from '../utilities/numberValidator';
import { detectableNumbers } from '../utilities/detectableNumbers';

beforeEach(() => cy.visit('http://localhost:3000/'));
detectableNumbers.forEach(number => {
    describe(`Given ${number} is drawn`, () => {
        describe('when clicking the "Detect" button', () => {
            it(`it guesses the number is ${number}.`, () => isCorrectLargeNumber(number))
        });
    });
});

const isCorrectLargeNumber = number => isCorrectNumber('largeNumbers', number);