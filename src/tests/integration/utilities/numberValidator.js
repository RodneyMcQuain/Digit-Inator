import { drawImage } from './imageDrawer';
import { getEnabledDetectButton } from './detectButtonRetriever';
import { getGuessedNumber } from './guessedNumberRetriever';

export const isCorrectNumber = (directory, numberToTest) => {
    drawImage(`${directory}/${numberToTest}.png`)
    getEnabledDetectButton().click();
    getGuessedNumber().contains(numberToTest);
};