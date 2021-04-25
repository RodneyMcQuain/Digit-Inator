import React from 'react';

const buttonFakeTestId = 'button';
const buttonFake = (({ onClick, disabled, children }) => <button onClick={onClick} disabled={disabled} data-testid={buttonFakeTestId}>{children}</button>);

const errorMessageFakeTestId = 'error-message';
const errorMessageFake = ({ isShown, children }) => isShown ? <div data-testid={errorMessageFakeTestId}>{children}</div> : null;

const loadingSpinnerFakeId = 'loading-spinner';
const loadingSpinnerFake = ({ isLoading }) => isLoading ? <div data-testid={loadingSpinnerFakeId} /> : null;

export {
    buttonFake, buttonFakeTestId,
    errorMessageFake, errorMessageFakeTestId,
    loadingSpinnerFake, loadingSpinnerFakeId,
};