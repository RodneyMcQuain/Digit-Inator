import React, { MutableRefObject, useContext } from 'react';
import detect from '../../services/mnist/numberDetection';
import GradientButton from '../shared/buttons/GradientButton';
import IconText from '../shared/IconText';
import { FiBarChart2 } from 'react-icons/fi';
import { detectionResult } from '../../services/anchors';
import styles from '../../styles/components/DetectButton.module.scss';
import { HasLoadedModelContext } from '../../services/HasLoadedModelContext';
import ErrorMessage from '../shared/ErrorMessage';
import LoadingSpinner from '../shared/LoadingSpinner';
import { detectButtonText } from './detectButtonText';

interface DetectButtonProps {
    canvasRef: MutableRefObject<HTMLCanvasElement>;
    setPredictions: (predictions: number[]) => void;
}

const DetectButton = ({ canvasRef, setPredictions }: DetectButtonProps) => {
    const hasntLoadedModel = !useContext(HasLoadedModelContext);

    return (
        <>
            <a className={styles['detect-button-anchor']} href={`#${detectionResult}`} onClick={e => hasntLoadedModel && e.preventDefault()}>
                <GradientButton onClick={() => { detectButtonHandler(canvasRef.current, setPredictions) }} disabled={hasntLoadedModel}>
                    <>
                        <IconText icon={<FiBarChart2 />} text={detectButtonText} />{" "}
                        &nbsp;<LoadingSpinner isLoading={hasntLoadedModel} />
                    </>
                </GradientButton>
            </a>
            <br />
            <ErrorMessage isShown={hasntLoadedModel}>The model is currently loading, please wait.</ErrorMessage>
        </>
    );
}

const detectButtonHandler = async (canvas: HTMLCanvasElement, setPredictions: (predictions: number[]) => void) => {
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as any;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const blackAndWhiteImageData = convertImageDataToBlackAndWhite(imageData);
    const predictions = await detect(blackAndWhiteImageData);
    setPredictions(predictions);
};

// Mutates the passed in imageData
const convertImageDataToBlackAndWhite = (imageData: ImageData): ImageData => {
    const WHITE = 255;
    const BLACK = 0;

    for (let i = 0; i < imageData.data.length; i += 4) {
        const redIndex = i;
        const greenIndex = i+1;
        const blueIndex = i+2;
        const alphaIndex = i+3;

        const colorValueResult = imageData.data[alphaIndex] !== 0 ? WHITE : BLACK;
        imageData.data[redIndex] = colorValueResult;
        imageData.data[greenIndex] = colorValueResult;
        imageData.data[blueIndex] = colorValueResult;
        imageData.data[alphaIndex] = colorValueResult;
    }

    return imageData;
};

export default DetectButton;