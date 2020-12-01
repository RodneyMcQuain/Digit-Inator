import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DetectButton from '../../../components/Drawing/DetectButton';
import detect from '../../../services/mnist/numberDetection';
import { HasLoadedModelContext } from '../../../services/HasLoadedModelContext';
import ErrorMessage from '../../../components/shared/ErrorMessage';
import GradientButton from '../../../components/shared/buttons/GradientButton';
import LoadingSpinner from '../../../components/shared/LoadingSpinner';
import {
    buttonFake, buttonFakeTestId,
    errorMessageFake, errorMessageFakeTestId,
    loadingSpinnerFake, loadingSpinnerFakeId,
} from '../../utilities/componentFakes';

jest.mock('../../../services/mnist/numberDetection');

jest.mock('../../../components/shared/ErrorMessage');
ErrorMessage.mockImplementation(errorMessageFake);

jest.mock('../../../components/shared/buttons/GradientButton');
GradientButton.mockImplementation(buttonFake);

jest.mock('../../../components/shared/LoadingSpinner');
LoadingSpinner.mockImplementation(loadingSpinnerFake);

global.fetch = jest.fn();

describe('The detect button', () => {
    it('displays "Detect" as text', () => {
        renderDetectButton(getCanvasRefStub(), jest.fn());
        expect(screen.getByText('Detect')).toBeInTheDocument();
    });

    describe('given the model is loading', () => {
        beforeEach(() => {
            renderDetectButton(getCanvasRefStub(), jest.fn(), false);
        });

        it('shows error message with appropriate text', () => {
            expect(screen.getByTestId(errorMessageFakeTestId)).toBeInTheDocument();
            expect(screen.getByText('The model is currently loading, please wait.')).toBeInTheDocument();
        });

        it('disables the detect button', () => {
            expect(screen.getByTestId(buttonFakeTestId)).toBeDisabled();
        });

        it('displays a loading spinner', () => {
            expect(screen.getByTestId(loadingSpinnerFakeId)).toBeInTheDocument();
        });
    });

    describe('given the model has loaded', () => {
        let setPredictionsMock;
        const MOCK_IMAGE_DATA = [200, 200, 200, 255, 0, 0, 0, 0];
        const MOCK_PREDICTIONS = [0.1, 0.2, 0.3, 0.4, 0.5];

        beforeEach(() => {
            setPredictionsMock = jest.fn();
            const canvasRefStub = getCanvasRefStub(MOCK_IMAGE_DATA);
            renderDetectButton(canvasRefStub, setPredictionsMock, true);
            detect.mockImplementation(() => MOCK_PREDICTIONS);
        });

        describe('when clicked', () => {
            beforeEach(async () => {
                await fireEvent.click(screen.getByText('Detect'));
            });

            it('calls function for number detection', () => {
                expect(detect).toBeCalledWith(expect.objectContaining({ data: [255, 255, 255, 255, 0, 0, 0, 0] }));
            });

            it('sets the predictions', () => {
                expect(setPredictionsMock).toBeCalledWith(MOCK_PREDICTIONS);
            });
        });
    });

    afterEach(cleanup);
});

const renderDetectButton = (canvasRef, setPredictions, hasModelLoaded) => (
    render(
        <HasLoadedModelContext.Provider value={hasModelLoaded}>
            <DetectButton canvasRef={canvasRef} setPredictions={setPredictions} />
        </HasLoadedModelContext.Provider>
    )
);

const getCanvasRefStub = (imageData = []) => ({
    current: {
        width: 0,
        height: 0,
        getContext: () => ({ 
            getImageData: () => ({ data: imageData }), 
            canvas: { width: 0, height: 0 },
        }),
        toDataURL: jest.fn()
    }
});